package com.patchingzone.energyvampire;

import android.os.Bundle;

public class Credits extends BaseWebview {

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	
	    // TODO Auto-generated method stub
	    // file:///android_asset/credit/index.html
	    //	http://vincentict.mine.nu/credit/
	    //SetPage("http://vincentict.mine.nu/credit/");	
	    SetPage("file:///android_asset/credit/index.html");	
    }

}
