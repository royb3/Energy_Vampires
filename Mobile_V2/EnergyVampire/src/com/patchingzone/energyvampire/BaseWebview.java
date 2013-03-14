package com.patchingzone.energyvampire;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Vibrator;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.GeolocationPermissions;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

@SuppressLint("NewApi")
public class BaseWebview extends Activity {

	private WebView webView;
	final Handler myHandler = new Handler();
	private JavaScriptInterface myJavaScriptInterface = new JavaScriptInterface(this);    
	/** Called when the activity is first created. */
	@SuppressLint("SetJavaScriptEnabled")
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    
	    //activity in full screen
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        //requestWindowFeature(Window.FEATURE_ACTION_BAR);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, 
                                WindowManager.LayoutParams.FLAG_FULLSCREEN);

	    
	    setContentView(R.layout.webview);
	    
	    webView = (WebView) findViewById(R.id.webView1);
		
		webView.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY);
		webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
		WebSettings settings = webView.getSettings();
		settings.setJavaScriptEnabled(true);
		settings.setGeolocationEnabled(true);
		settings.setJavaScriptCanOpenWindowsAutomatically(true);
		webView.setWebViewClient(new WebViewClient()
		{
		    @Override
			public boolean shouldOverrideUrlLoading(WebView view, String url) {
	             view.loadUrl(url);
	             return true;
	       }

		    @Override
			public void onPageFinished(WebView view, String url) 
		    {
		    	
	       	}
		    @Override
			public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) 
		    {
		    	
		    }
		 });
		 
        settings.setLightTouchEnabled(true);
        webView.addJavascriptInterface(myJavaScriptInterface, "AndroidFunction");
        
        webView.setWebChromeClient(new WebChromeClient() {
        	 public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
        	    callback.invoke(origin, true, false);
        	 }
        	});
        
        webView.getSettings().setGeolocationDatabasePath("/data/data/qq");

	}
	
	public class JavaScriptInterface {
		Context mContext;

	    JavaScriptInterface(Context c) {
	        mContext = c;
	    }
	    
	    public void Vibrate(){	    	    	
	    	Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
	    	v.vibrate(1000);
    	} 
    }
	

	public void setPage(String Url)
	{
		webView.loadUrl(Url);
	}

}
