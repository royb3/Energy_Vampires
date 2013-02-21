package com.patchingzone.energyvampire;

import org.json.JSONArray;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.KeyEvent;
import android.widget.Toast;

public class Game extends Activity {

	MainApp ma;
		
	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
	    super.onCreate(savedInstanceState);
	    setContentView(R.layout.game);
	    Log.d("game", "ingame");
	    
	    ma = new MainApp();
	    
	    exit();
	    // TODO Auto-generated method stub
	}
	
	@Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        int keyCode = event.getKeyCode();
        switch (keyCode) {
        case KeyEvent.KEYCODE_VOLUME_UP:
        case KeyEvent.KEYCODE_VOLUME_DOWN:
        	Log.e("volume keys", "pushed");
        	
        	ma.ioWebSocket.emit("Shoot", new JSONArray().put("I pushed the button"));
            return true;
        default:
            return super.dispatchKeyEvent(event);
        }
    }
	
	@Override
	public void onBackPressed() {
	    // Do Here what ever you want do on back press;
		Toast.makeText(getApplicationContext(), "You shall not pass!", Toast.LENGTH_SHORT).show();

	}
	
	public void exit()
	{
		Thread exit = new Thread() {
			@Override
			public void run() {
				while(ma.gameActive)
				{
					try {
						sleep(500);
					} catch (InterruptedException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
				finish();
			}
		};
		exit.start();
	}
}
