package com.patchingzone.energyvampire;

import android.media.AudioManager;
import android.media.SoundPool;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends Activity {

	MainApp ma;
	
	public Button BT_home;
	public TextView info;
	public TextView count;
	public TextView GPS;
	public Boolean ifConnected = false;
	public RelativeLayout body;
	public Animation fade;
	
	public SoundPool sp;
	public int sound;
	public int sound2;
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        
        ma = (MainApp)getApplication();
        
        
        this.info = (TextView) this.findViewById(R.id.textView1);
		this.count = (TextView) this.findViewById(R.id.Count);
		this.GPS = (TextView) this.findViewById(R.id.textView2);
		this.body = (RelativeLayout) this.findViewById(R.id.body); 
		this.BT_home = (Button) this.findViewById(R.id.button1);
		
		MainApp.app_preferences = PreferenceManager.getDefaultSharedPreferences(this);
		
		fade = AnimationUtils.loadAnimation(this, R.anim.fade);
		
		//soundpool
		sp = new SoundPool(5, AudioManager.STREAM_MUSIC, 0);
		sound = sp.load(this, R.raw.sound1, 1);
		sound2 = sp.load(this, R.raw.sound2, 1);
		
		this.BT_home.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				if(!ifConnected){
					//connect to server.
					if(ma.startConnection()){
						ifConnected = true;
						info.setText("U're in lobby.");
						BT_home.setText("I'm Ready");
						ma.createGPS();
					}
					else
					{
						Toast.makeText(getApplicationContext(), "Can't Connect!", Toast.LENGTH_SHORT).show();
					}
					
				}
				else{
					//Set rdy	
					ma.testMsg();
					Log.d("STATE", "LOBBY");
				}
				
			}
		});
				
	}
    
    @Override
	public boolean onOptionsItemSelected(MenuItem item) {
	    // Handle item selection
	    switch (item.getItemId()) {
	        case R.id.Cred:
	        	Intent cred =new Intent(MainActivity.this,Credits.class);
                startActivity(cred);
	        	return true;
	        case R.id.Options:
	        	Intent Pref =new Intent(MainActivity.this,Options.class);
	        	startActivity(Pref);
	        	return true;
	        case R.id.Disconnect:
	        	ifConnected = ma.closeConnection();
	        	BT_home.setText("Connect");
	        	info.setText("Click connect to connect to the server.");
	        	return true;
	        default:
	            return super.onOptionsItemSelected(item);
	    }
	}
		
        
    

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
    
    public boolean onPrepareOptionsMenu(Menu menu)
    {
    	
    	MenuItem options = menu.findItem(R.id.Options);
    	MenuItem dc = menu.findItem(R.id.Disconnect);
    	if(!ifConnected){
    		options.setVisible(true);
    		dc.setVisible(false);
    	}
    	else{
    		options.setVisible(false);
    		dc.setVisible(true);
    	}
    	return true;
    }
    
    
    
}
