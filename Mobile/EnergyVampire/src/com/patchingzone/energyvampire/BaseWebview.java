package com.patchingzone.energyvampire;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Vibrator;
import android.view.View;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ListView;

public class BaseWebview extends Activity {

	private WebView webView;
	final Handler myHandler = new Handler();
	private JavaScriptInterface myJavaScriptInterface = new JavaScriptInterface(this);    
	/** Called when the activity is first created. */
	@SuppressLint("SetJavaScriptEnabled")
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.webview);
	    // TODO Auto-generated method stub
	    
	    webView = (WebView) findViewById(R.id.webView1);
		webView.getSettings().setJavaScriptEnabled(true);
		webView.setScrollBarStyle(View.SCROLLBARS_OUTSIDE_OVERLAY);
		webView.setOverScrollMode(View.OVER_SCROLL_NEVER);
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
		 
        webView.getSettings().setLightTouchEnabled(true);
        webView.addJavascriptInterface(myJavaScriptInterface, "AndroidFunction");
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
	

	public void SetPage(String Url)
	{
		webView.loadUrl(Url);
	}

}
