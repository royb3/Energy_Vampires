package com.patchingzone.energyvampire;

import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;

public class GameWebView extends BaseWebview {

	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    
	    setPage("http://mediawerf.dyndns.org/mobile.html");		
	    //setPage("http://www.meneame.net");	
    }
	

}
