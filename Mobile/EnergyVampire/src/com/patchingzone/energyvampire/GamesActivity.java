package com.patchingzone.energyvampire;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.Toast;

public class GamesActivity extends MainActivity {
	
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		
	}
	
	public void startGame()
	{
		info.setVisibility(View.GONE);
		Toast toast = Toast.makeText(getApplicationContext(), "Starting", Toast.LENGTH_SHORT);
		toast.show();
		count.setVisibility(View.VISIBLE);
		new CountDownTimer(10000, 100) {
		int secondsLeft = 10; 

      	public void onTick(long millisUntilFinished) {
    	 	if (Math.round((float)millisUntilFinished / 1000.0f) != secondsLeft)
		        {  
		            secondsLeft = Math.round((float)millisUntilFinished / 1000.0f);
		            count.setText("" +secondsLeft );
		            sp.play(sound, 1, 1, 0, 0, 1);
		        }
      		}
      	
		     public void onFinish() {
		    	 sp.play(sound2, 1, 1, 0, 0, 1);
		    	 Color(4); 
		    }
		}.start();
	}
	
	
	

}
