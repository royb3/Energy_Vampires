package com.patchingzone.energyvampire;

import android.os.Bundle;
import android.preference.PreferenceManager;
import android.app.Activity;
import android.content.SharedPreferences;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class Settings extends MainActivity {
	
	EditText Server_IP, Server_Port, Phone_ID;
	Button Set, Get;
	

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_settings);
		
		Server_IP = (EditText) findViewById(R.id.Server_IP_textbox);
		Server_Port = (EditText) findViewById(R.id.Server_Port_textbox);
		Phone_ID = (EditText) findViewById(R.id.Phone_ID_textbox);
		Set = (Button) findViewById(R.id.Settings_save_bt);
		
		
		fillSettings();
		
		Set.setOnClickListener(new View.OnClickListener() {
			
			@Override
			public void onClick(View v) {
				SharedPreferences.Editor editor = app_preferences.edit();
				
				editor.putString("IP", Server_IP.getText().toString().trim());
				Log.d("ServerIP" , Server_IP.getText().toString().trim());
				editor.commit();
				
				editor.putString("Port", Server_Port.getText().toString().trim());
				Log.d("ServerPort" , Server_Port.getText().toString().trim());
				editor.commit();
				
				editor.putString("ID", Phone_ID.getText().toString().trim());
				Log.d("PhoneID" , Phone_ID.getText().toString().trim());
				editor.commit();
				
				Toast toast = Toast.makeText(getApplicationContext(), "Settings Saved", Toast.LENGTH_SHORT);
				toast.show();
			}
		});	
	}
	
	public void fillSettings(){
		String ServerIP = app_preferences.getString("IP", "");
		Server_IP.setText(ServerIP);
		Log.d("ServerIP", ServerIP);
		
		String ServerPort = app_preferences.getString("Port", "");
		Server_Port.setText(ServerPort);
		Log.d("ServerPort" , ServerPort);
		
		String PhoneID = app_preferences.getString("ID", "");
		Phone_ID.setText(PhoneID);
		Log.d("PhoneID", PhoneID);
		
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.activity_settings, menu);
		return true;
	}

}
