package com.patchingzone.energyvampire;

import java.text.SimpleDateFormat;
import java.util.Date;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;



public class GPS extends Activity {
	
	private LocationManager service;
	private LocationManager locationManager;
	private String provider;
	private Criteria criteria = new Criteria();
	
	public void StartGPS()
	{
		service = (LocationManager) getSystemService(LOCATION_SERVICE);	        	
		locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
	    criteria.setAccuracy(Criteria.ACCURACY_FINE);
	    provider = locationManager.getBestProvider(criteria, false);
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
				
				
			Log.e("GPS", "lat___:"+location.getLatitude()+
	        			" \nLong__:"+location.getLongitude()+
	        			" \nAcc___:"+location.getAccuracy()+
	        			" \nTime__:"+vv+
	        			" \nHead__:"+location.getBearing());
			}
		});

	}
	
	
	
}
