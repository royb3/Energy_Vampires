package com.patchingzone.energyvampire;


import java.text.SimpleDateFormat;
import java.util.Date;

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.media.AudioManager;
import android.media.SoundPool;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.preference.PreferenceManager;
import android.provider.Settings;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.util.Log;
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

	public Button BT_home;
	public TextView info;
	public TextView count;
	public TextView GPS;
	public Boolean ConnectOk = false;
	public RelativeLayout body;
	public Animation fade;
	
	public SoundPool sp;
	public int sound;
	public int sound2;
	
	public static SharedPreferences app_preferences;
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		this.info = (TextView) this.findViewById(R.id.textView1);
		this.count = (TextView) this.findViewById(R.id.Count);
		this.GPS = (TextView) this.findViewById(R.id.textView2);
		this.body = (RelativeLayout) this.findViewById(R.id.body); 
		this.BT_home = (Button) this.findViewById(R.id.button1);
		
		app_preferences = PreferenceManager.getDefaultSharedPreferences(this);
 
		fade = AnimationUtils.loadAnimation(this, R.anim.fade);
		
		//soundpool
		sp = new SoundPool(5, AudioManager.STREAM_MUSIC, 0);
		sound = sp.load(this, R.raw.sound1, 1);
		sound2 = sp.load(this, R.raw.sound2, 1);
		
		this.BT_home.setOnClickListener(new OnClickListener() {
			
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				if(ConnectOk)
				{
					//startGame();
					BT_home.setVisibility(View.GONE);
				}
				else{
					if(Connect.isConnected()){
						BT_home.setText("I'm Ready");
						ConnectOk = true;
					}
					else
					{
						Toast.makeText(getApplicationContext(), "Can't Connect!", Toast.LENGTH_SHORT).show();
					}
				}
				
			}
		});
				
	}
		
	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
	    // Handle item selection
	    switch (item.getItemId()) {
	        case R.id.GPS:
	        	createCompass();
	        	createGPS();
	        	
	            return true;
	        case R.id.Chat:
	        	//Intent sec=new Intent(MainActivity.this,Chat.class);
                //startActivity(sec);
	        	return true;
	        case R.id.Cred:
	        	Intent cred =new Intent(MainActivity.this,Credits.class);
                startActivity(cred);
	        	return true;
	        case R.id.Prefence:
	        	Intent Pref =new Intent(MainActivity.this, com.patchingzone.energyvampire.Settings.class);
	        	startActivity(Pref);
	        	return true;
	        default:
	            return super.onOptionsItemSelected(item);
	    }
	}

	/*public void connect()
	{
		Toast toast = Toast.makeText(getApplicationContext(), "Connecting", Toast.LENGTH_SHORT);
		toast.show();
		
		info.setText("Click I'm Ready if your ready.");
		BT_home.setText("I'm Ready");
		
		ConnectOk = true;
	}*/
	
	
	
	public void  Color(final int color)
	{
		count.setVisibility(View.GONE);
   	 	  
    	 body.startAnimation(fade);
			
			 fade.setAnimationListener(new AnimationListener() {
                @Override
				public void onAnimationStart(Animation anim)
                {
                	switch(color)
               	 	{
           	 		case 0:
           	 			body.setBackgroundColor(android.graphics.Color.BLUE);
           	   		break;
           	 		case 1:
           	 			body.setBackgroundColor(android.graphics.Color.GREEN);
            			break;
           	 		case 2:
           	 			body.setBackgroundColor(android.graphics.Color.RED);
            			break;
           	 		case 3:
           	 			body.setBackgroundColor(android.graphics.Color.YELLOW);
            			break;
               	 	}	
                };
                @Override
				public void onAnimationRepeat(Animation anim)
                {
                };
                @Override
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
	
	//start GPS
	
	public void createGPS()
	{
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
	}
	
	//end GPS
	
	//Start Compass Code
	
	private static SensorManager sensorService;
	private Sensor sensor;
	
	public void createCompass()
	{
		Log.e("compass","createCompass");
		
		sensorService = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
	    sensor = sensorService.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
	    if (sensor != null) {
	      sensorService.registerListener(mySensorEventListener, sensor,
	          SensorManager.SENSOR_DELAY_NORMAL);
	      Log.i("Compass MainActivity", "Registerered for ORIENTATION Sensor");

	    } else {
	      Log.e("Compass MainActivity", "Registerered for ORIENTATION Sensor");
	      Toast.makeText(this, "ORIENTATION Sensor not found",
	          Toast.LENGTH_LONG).show();
	      finish();
	    }
	}
	
	private SensorEventListener mySensorEventListener = new SensorEventListener() {

	    @Override
	    public void onAccuracyChanged(Sensor sensor, int accuracy) {
	    	Log.e("compass", "onAccuracyChanged");
	    }

	    @Override
	    public void onSensorChanged(SensorEvent event) {
	    	Log.e("compass", "onSensorChanged \n"+event.values[0]+"\n"+event.values[1]);
	    }
	  };
	
	 public void stopCompass()
	 {
		 if (sensor != null) {
		      sensorService.unregisterListener(mySensorEventListener);
		    }
	 }
	 
	 public void startCompass()
	 {
		 if (sensor != null) {
		      //sensorService.unregisterListener(mySensorEventListener);
		    }
	 }
	//End Compass Code
	

	@Override
	protected void onResume()
	{
		super.onResume();
		startCompass();
	}
	
	@Override
	protected void onPause()
	{
		super.onPause();
		stopCompass();
	}
	
	protected void onStop()
	{
		super.onStop();
		Connect.ioWebSocket.disconnect();
		//Connect.connection.stop();
	}
	
	
}
