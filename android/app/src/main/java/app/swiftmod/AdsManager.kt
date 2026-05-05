package app.swiftmod

import android.app.Activity
import com.unity3d.ads.IUnityAdsInitializationListener
import com.unity3d.ads.IUnityAdsLoadListener
import com.unity3d.ads.IUnityAdsShowListener
import com.unity3d.ads.UnityAds
import com.unity3d.ads.UnityAdsShowOptions

object AdsManager {
    // From https://dashboard.unity3d.com → Monetization → Project settings
    private const val UNITY_GAME_ID = "YOUR_UNITY_GAME_ID"
    private const val PLACEMENT_REWARDED = "Rewarded_Android"
    private const val TEST_MODE = true

    fun init(activity: Activity, onReady: () -> Unit = {}) {
        UnityAds.initialize(activity.applicationContext, UNITY_GAME_ID, TEST_MODE,
            object : IUnityAdsInitializationListener {
                override fun onInitializationComplete() {
                    loadRewarded()
                    onReady()
                }
                override fun onInitializationFailed(
                    error: UnityAds.UnityAdsInitializationError?, message: String?
                ) {}
            })
    }

    private fun loadRewarded() {
        UnityAds.load(PLACEMENT_REWARDED, object : IUnityAdsLoadListener {
            override fun onUnityAdsAdLoaded(placementId: String?) {}
            override fun onUnityAdsFailedToLoad(
                placementId: String?, error: UnityAds.UnityAdsLoadError?, message: String?
            ) {}
        })
    }

    /** result == true means COMPLETED (user earned reward); false means failed/skipped */
    fun showRewarded(activity: Activity, result: (Boolean) -> Unit) {
        UnityAds.show(activity, PLACEMENT_REWARDED, UnityAdsShowOptions(),
            object : IUnityAdsShowListener {
                override fun onUnityAdsShowFailure(
                    placementId: String?, error: UnityAds.UnityAdsShowError?, message: String?
                ) {
                    result(false); loadRewarded()
                }
                override fun onUnityAdsShowStart(placementId: String?) {}
                override fun onUnityAdsShowClick(placementId: String?) {}
                override fun onUnityAdsShowComplete(
                    placementId: String?, state: UnityAds.UnityAdsShowCompletionState?
                ) {
                    result(state == UnityAds.UnityAdsShowCompletionState.COMPLETED)
                    loadRewarded()
                }
            })
    }
}
