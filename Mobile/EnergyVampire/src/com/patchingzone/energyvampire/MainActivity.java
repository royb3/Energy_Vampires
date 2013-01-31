package com.patchingzone.energyvampire;


import java.text.SimpleDateFormat;
import java.util.Date;

import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.provider.Settings;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.animation.Animation;
import android.view.animation.Animation.AnimationListener;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

	private Button BT_home;
	private TextView info;
	private TextView count;
	private TextView GPS;
	private Boolean ConnectOk = false;
	private RelativeLayout body;
	private Animation fade;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		this.info = (TextView) this.findViewById(R.id.textView1);
		this.count = (TextView) this.findViewById(R.id.Count);
		this.body = (RelativeLayout) this.findViewById(R.id.body);
		//button 1 
		this.BT_home = (Button) this.findViewById(R.id.button1);
		this.GPS = (TextView) this.findViewById(R.id.textView2); 
		fade = AnimationUtils.loadAnimation(this, R.anim.fade);
		
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
	public boolean onOptionsItemSelected(MenuItem item) {
	    // Handle item selection
	    switch (item.getItemId()) {
	        case R.id.GPS:
	        	//Log.e("gps", "start");
	        	GPS.setVisibility(View.VISIBLE);
	        	LocationManager service = (LocationManager) getSystemService(LOCATION_SERVICE);	        	
	        	LocationManager locationManager;
	        	String provider;
	        	locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
	        	    // Define the criteria how to select the locatioin provider -> use
	        	    // default
        	    Criteria criteria = new Criteria();
        	    criteria.setAccuracy(Criteria.ACCURACY_FINE);
        	    provider = locationManager.getBestProvider(criteria, false);
        	    //Log.e("asd", ""+locationManager.getAllProviders());
        	    locationManager.requestLocationUpdates(provider, 100, 1, new LocationListener() {
					
					@Override
					public void onStatusChanged(String provider, int status, Bundle extras) {
						// TODO Auto-generated method stub
						
					}
					
					@Override
					public void onProviderEnabled(String provider) {
						// TODO Auto-generated method stub
						
					}
					
					@Override
					public void onProviderDisabled(String provider) {
						// TODO Auto-generated method stub
						Intent intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS);
			        	  startActivity(intent);
					}
					
					@Override
					public void onLocationChanged(Location location) {
						// TODO Auto-generated method stub
						Date df = new java.util.Date(location.getTime());
						String vv = new SimpleDateFormat("dd-MM-yyyy , HH:mm:ss").format(df);
						
						
					GPS.setText("lat___:"+location.getLatitude()+
			        			" \nLong__:"+location.getLongitude()+
			        			" \nAcc___:"+location.getAccuracy()+
			        			" \nTime__:"+vv+
			        			" \nHead__:"+location.getBearing());
					}
				});
	        	
	            return true;
	        case R.id.Chat:
	        	Intent sec=new Intent(MainActivity.this,Chat.class);
                startActivity(sec);
	        	return true;
	        case R.id.Cred:
	        	Intent cred =new Intent(MainActivity.this,Credits.class);
                startActivity(cred);
	        	return true;
	        default:
	            return super.onOptionsItemSelected(item);
	    }
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
		         if(millisUntilFinished / 1000 < 1)
		         {
		        	 
		         }
		         else if(millisUntilFinished /1000 == 1)
		         {
		        	 
		         }
		     }

		     public void onFinish() {
		         Color(4);
		     }
		  }.start();
	}
	
	public void  Color(final int color)
	{
		count.setVisibility(View.GONE);
   	 	  
    	 body.startAnimation(fade);
			
			 fade.setAnimationListener(new AnimationListener() {
                public void onAnimationStart(Animation anim)
                {
                	switch(color)
               	 	{
           	 		case 1:
           	 			body.setBackgroundColor(android.graphics.Color.BLUE);
           	   		break;
           	 		case 2:
           	 			body.setBackgroundColor(android.graphics.Color.GREEN);
            			break;
           	 		case 3:
           	 			body.setBackgroundColor(android.graphics.Color.RED);
            			break;
           	 		case 4:
           	 			body.setBackgroundColor(android.graphics.Color.YELLOW);
            			break;
               	 	}	
                };
                public void onAnimationRepeat(Animation anim)
                {
                };
                public void onAnimationEnd(Animation anim)
                {
                    //body.setVisibility(View.GONE);
                    body.setBackgroundColor(android.graphics.Color.BLACK);
                };     
            });     
    
	}
	
	
	
	
	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_main, menu);
		return true;
	}
	

}
