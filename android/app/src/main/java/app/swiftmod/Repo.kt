package app.swiftmod

import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import java.net.HttpURLConnection
import java.net.URL

@Serializable
data class Game(
    val id: String,
    val title: String,
    val version: String,
    val icon: String,
    val url: String,
)

object Repo {
    // Replace with your hosted feed (GitHub raw, gist, S3, Firebase Hosting, etc.)
    private const val FEED_URL = "https://example.com/games.json"

    private val json = Json { ignoreUnknownKeys = true }

    fun fetchGames(): List<Game> {
        val conn = (URL(FEED_URL).openConnection() as HttpURLConnection).apply {
            requestMethod = "GET"
            connectTimeout = 15_000
            readTimeout = 15_000
        }
        return conn.inputStream.bufferedReader().use { r ->
            json.decodeFromString(r.readText())
        }
    }
}
