package com.patchingzone.energyvampire;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Vibrator;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ListView;
import android.widget.Toast;

public class BaseWebview extends Activity {

	private WebView webView;
	final Handler myHandler = new Handler();
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.webview);
	    // TODO Auto-generated method stub
	    
	    webView = (WebView) findViewById(R.id.webView1);
		webView.getSettings().setJavaScriptEnabled(true);
		webView.setScrollBarStyle(WebView.SCROLLBARS_OUTSIDE_OVERLAY);
		webView.setOverScrollMode(ListView.OVER_SCROLL_NEVER);
		webView.setWebViewClient(new WebViewClient()
		{
		    public boolean shouldOverrideUrlLoading(WebView view, String url) {
	             view.loadUrl(url);
	             return true;
	       }

		    public void onPageFinished(WebView view, String url) 
		    {
		    	
	       	}
		    public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) 
		    {
		    	
		    }
		 });
		
		final JavaScriptInterface myJavaScriptInterface = new JavaScriptInterface(this);    	 
    	 
        webView.getSettings().setLightTouchEnabled(true);
        webView.getSettings().setJavaScriptEnabled(true);
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
