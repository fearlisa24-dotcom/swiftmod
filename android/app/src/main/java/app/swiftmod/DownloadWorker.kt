package app.swiftmod

import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.BroadcastReceiver
import android.database.Cursor
import android.net.Uri
import android.os.Environment
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import androidx.work.CoroutineWorker
import androidx.work.WorkerParameters
import kotlinx.coroutines.suspendCancellableCoroutine
import java.io.File
import kotlin.coroutines.resume

/**
 * Enqueues an APK download via system DownloadManager and prompts install when complete.
 *
 * Inputs (workDataOf):
 *   "url"   -> direct APK URL
 *   "title" -> notification title
 */
class DownloadWorker(ctx: Context, params: WorkerParameters) : CoroutineWorker(ctx, params) {

    override suspend fun doWork(): Result {
        val url = inputData.getString("url") ?: return Result.failure()
        val title = inputData.getString("title") ?: "Download"
        val safe = title.replace(Regex("[^A-Za-z0-9._-]"), "_") + ".apk"

        val dm = applicationContext.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        val request = DownloadManager.Request(Uri.parse(url))
            .setTitle(title)
            .setMimeType("application/vnd.android.package-archive")
            .setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            .setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, safe)
            .setAllowedOverMetered(true)

        val id = dm.enqueue(request)
        val ok = awaitCompletion(dm, id)
        if (!ok) return Result.retry()

        promptInstall(applicationContext, dm.getUriForDownloadedFile(id))
        return Result.success()
    }

    private suspend fun awaitCompletion(dm: DownloadManager, id: Long): Boolean =
        suspendCancellableCoroutine { cont ->
            val receiver = object : BroadcastReceiver() {
                override fun onReceive(c: Context, i: Intent) {
                    val finished = i.getLongExtra(DownloadManager.EXTRA_DOWNLOAD_ID, -1)
                    if (finished != id) return
                    val q = DownloadManager.Query().setFilterById(id)
                    dm.query(q)?.use { cur: Cursor ->
                        if (cur.moveToFirst()) {
                            val status = cur.getInt(cur.getColumnIndexOrThrow(DownloadManager.COLUMN_STATUS))
                            cont.resume(status == DownloadManager.STATUS_SUCCESSFUL)
                        } else cont.resume(false)
                    } ?: cont.resume(false)
                    applicationContext.unregisterReceiver(this)
                }
            }
            ContextCompat.registerReceiver(
                applicationContext, receiver,
                IntentFilter(DownloadManager.ACTION_DOWNLOAD_COMPLETE),
                ContextCompat.RECEIVER_EXPORTED
            )
            cont.invokeOnCancellation { runCatching { applicationContext.unregisterReceiver(receiver) } }
        }

    private fun promptInstall(ctx: Context, contentUri: Uri?) {
        val uri = contentUri ?: return
        // contentUri from DownloadManager is already a content:// URI on modern Android.
        val install = Intent(Intent.ACTION_VIEW).apply {
            setDataAndType(uri, "application/vnd.android.package-archive")
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_GRANT_READ_URI_PERMISSION)
        }
        ctx.startActivity(install)
    }

    companion object {
        // Convenience for legacy file paths via FileProvider, if you ever switch destinations.
        fun fileProviderUri(ctx: Context, file: File): Uri =
            FileProvider.getUriForFile(ctx, "${ctx.packageName}.fileprovider", file)
    }
}
