package com.patchingzone.energyvampire;

import java.io.Console;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.animation.ArgbEvaluator;
import android.animation.ObjectAnimator;
import android.app.Activity;
import android.graphics.drawable.TransitionDrawable;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.view.View.OnClickListener;
import android.webkit.ConsoleMessage;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

	private Button BT_home;
	private TextView info;
	private TextView count;
	private Boolean ConnectOk = false;
	private RelativeLayout body;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		this.info = (TextView) this.findViewById(R.id.textView1);
		this.count = (TextView) this.findViewById(R.id.Count);
		this.body = (RelativeLayout) this.findViewById(R.id.body);
		//button 1 
		this.BT_home = (Button) this.findViewById(R.id.button1);
		this.BT_home.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				if(ConnectOk)
				{
					startGame();
					BT_home.setVisibility(View.GONE);
				}else
				{
					connect();
				}
				
			}
		});
		
	}

	public void connect()
	{
		Toast toast = Toast.makeText(getApplicationContext(), "Connecting", Toast.LENGTH_SHORT);
		toast.show();
		info.setText("Click I'm Ready if your ready.");
		BT_home.setText("I'm Ready");
		
		ConnectOk = true;
	}
	
	public void startGame()
	{
		info.setVisibility(View.GONE);
		Toast toast = Toast.makeText(getApplicationContext(), "Starting", Toast.LENGTH_SHORT);
		toast.show();
		count.setVisibility(View.VISIBLE);
		new CountDownTimer(10999, 1000) {

		     public void onTick(long millisUntilFinished) {
		         count.setText("" + millisUntilFinished / 1000);
		     }

		     public void onFinish() {
		         Color();
		     }
		  }.start();
	}
	
	public void  Color()
	{
		count.setVisibility(View.GONE);
		
		new CountDownTimer(2550, 1) {

		     public void onTick(long millisUntilFinished) {
		         body.setBackgroundColor(android.graphics.Color.rgb(((int)millisUntilFinished / 10),0,0));
		        //Log.e("haas", ""+millisUntilFinished);  
		     }

		     public void onFinish() {
		         
		     }
		  }.start(); 
	}
	
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}
	

}
