package com.patchingzone.energyvampire;

import java.io.BufferedReader;
import java.io.Console;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.UnknownHostException;
import java.util.Random;

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
		
		/*
		 try {
	            Socket s = new Socket("10.250.89.28", 80);	            //outgoing stream redirect to socket
	            OutputStream out = s.getOutputStream();
	            PrintWriter output = new PrintWriter(out);
	            output.println("Hello Android!");
	            BufferedReader input = new BufferedReader(new InputStreamReader(s.getInputStream()));
	            //read line(s)
	            String st = input.readLine();
	            //Close connection
	            s.close();
				Log.e("con", "ok" + st + ": "+ input);
	    } catch (UnknownHostException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            Log.e("con", "f1");

	    } catch (IOException e) {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	            Log.e("con", "f2" + e );
	    }
*/
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
		    	 int Min = 1;
		    	 int Max = 4;
		    	 int rndNum = (int) (Math.random() * ( Max - Min ));
		         Color(rndNum);
		     }
		  }.start();
	}
	
	public void  Color(final int color)
	{
		count.setVisibility(View.GONE);
		
		// 20 = 5.10 sec
		// 10 = 2.55 sec
		final int multi = 20;
		new CountDownTimer((255 * multi), 1) {

			
		     public void onTick(long millisUntilFinished) 
		     {		    	 
		    	 switch(color)
		    	 {
	    	 		case 1:
	    	 			body.setBackgroundColor(android.graphics.Color.rgb(((int)millisUntilFinished / multi),0,0)); 
		    		break;
	    	 		case 2:
	    	 			body.setBackgroundColor(android.graphics.Color.rgb(0,((int)millisUntilFinished / multi),0)); 
    	 			break;
	    	 		case 3:
	    	 			body.setBackgroundColor(android.graphics.Color.rgb(0,0,((int)millisUntilFinished / multi))); 
    	 			break;
	    	 		case 4:
	    	 			body.setBackgroundColor(android.graphics.Color.rgb(((int)millisUntilFinished / multi),0,((int)millisUntilFinished / multi))); 
    	 			break;
		    	 }		         
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
