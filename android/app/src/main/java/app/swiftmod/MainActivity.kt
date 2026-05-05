package app.swiftmod

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.work.Data
import androidx.work.OneTimeWorkRequestBuilder
import androidx.work.WorkManager
import coil.compose.AsyncImage
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        AdsManager.init(this)
        setContent {
            MaterialTheme(colorScheme = lightColorScheme()) {
                Surface(Modifier.fillMaxSize()) { AppRoot() }
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun AppRoot() {
    val activity = LocalContext.current as MainActivity
    val scope = rememberCoroutineScope()
    val snackbar = remember { SnackbarHostState() }

    var games by remember { mutableStateOf<List<Game>>(emptyList()) }
    var query by remember { mutableStateOf("") }
    var tab by remember { mutableStateOf(0) }
    var loading by remember { mutableStateOf(true) }
    val active = remember { mutableStateListOf<String>() }

    LaunchedEffect(Unit) {
        loading = true
        runCatching { withContext(Dispatchers.IO) { Repo.fetchGames() } }
            .onSuccess { games = it }
            .onFailure { scope.launch { snackbar.showSnackbar("Failed to load games") } }
        loading = false
    }

    fun onDownload(game: Game) {
        AdsManager.showRewarded(activity) { rewarded ->
            if (!rewarded) {
                scope.launch { snackbar.showSnackbar("Watch the full video to start your download.") }
                return@showRewarded
            }
            val req = OneTimeWorkRequestBuilder<DownloadWorker>()
                .setInputData(Data.Builder()
                    .putString("url", game.url)
                    .putString("title", "${game.title}-${game.version}")
                    .build())
                .build()
            WorkManager.getInstance(activity).enqueue(req)
            active += game.title
            scope.launch { snackbar.showSnackbar("Download started: ${game.title}") }
        }
    }

    Scaffold(
        topBar = { CenterAlignedTopAppBar(title = { Text("SwiftMod", fontWeight = FontWeight.Bold) }) },
        snackbarHost = { SnackbarHost(snackbar) },
        bottomBar = {
            NavigationBar {
                NavigationBarItem(selected = tab == 0, onClick = { tab = 0 },
                    icon = { Text("📚") }, label = { Text("Library") })
                NavigationBarItem(selected = tab == 1, onClick = { tab = 1 },
                    icon = { Text("⬇") }, label = { Text("Downloads") })
            }
        }
    ) { padding ->
        Column(Modifier.padding(padding).fillMaxSize()) {
            if (tab == 0) {
                OutlinedTextField(
                    value = query, onValueChange = { query = it },
                    placeholder = { Text("Search games…") },
                    singleLine = true,
                    modifier = Modifier.fillMaxWidth().padding(12.dp),
                )
                if (loading) {
                    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) { CircularProgressIndicator() }
                } else {
                    val filtered = games.filter { it.title.contains(query, ignoreCase = true) }
                    LazyVerticalGrid(
                        columns = GridCells.Fixed(2),
                        contentPadding = PaddingValues(12.dp),
                        verticalArrangement = Arrangement.spacedBy(12.dp),
                        horizontalArrangement = Arrangement.spacedBy(12.dp),
                    ) {
                        items(filtered, key = { it.id }) { GameCard(it, ::onDownload) }
                    }
                }
            } else {
                DownloadsTab(active)
            }
        }
    }
}

@Composable
private fun GameCard(game: Game, onDownload: (Game) -> Unit) {
    ElevatedCard {
        Column(Modifier.padding(10.dp)) {
            AsyncImage(
                model = game.icon, contentDescription = game.title,
                modifier = Modifier.fillMaxWidth().height(120.dp)
            )
            Spacer(Modifier.height(8.dp))
            Text(game.title, fontWeight = FontWeight.SemiBold, maxLines = 1)
            Text("v${game.version}", style = MaterialTheme.typography.bodySmall)
            Spacer(Modifier.height(8.dp))
            Button(onClick = { onDownload(game) }, modifier = Modifier.fillMaxWidth()) {
                Text("Download")
            }
        }
    }
}

@Composable
private fun DownloadsTab(active: List<String>) {
    if (active.isEmpty()) {
        Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
            Text("No active downloads", color = MaterialTheme.colorScheme.onSurfaceVariant)
        }
    } else {
        Column(Modifier.padding(16.dp)) {
            active.forEach { Text("• $it (in progress)") }
        }
    }
}
