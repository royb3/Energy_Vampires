package com.patchingzone.energyvampire;

import java.io.IOException;

import android.R.bool;
import android.os.Bundle;
import android.util.Log;

import com.clwillingham.socket.io.IOMessage;
import com.clwillingham.socket.io.IOSocket;
import com.clwillingham.socket.io.MessageCallback;

public class Connect extends MainActivity{
	
	public static IOSocket ioWebSocket;
	public static String address;
	public static MessageCallback callback;
	public static Boolean canConnect = false;
	
	public static String[] testString = {"message\" : \"test nr 2"};
	public static IOMessage msg;
	
	public static Thread connection;
	
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
	}
	
	public static void createCallback()
	{
		msg = new IOMessage(IOMessage.EVENT, -1, "", "");
		Log.d("test","HAAAAI");
		callback = new MessageCallback() {

			@Override
			public void onOpen() {
			}

			@Override
			public void onMessage(String message) {
			}

			@Override
			public void on(String event, String data) {
			}

			@Override
			public void onEvent(String message) {
					JsonParser.Parse(message);
					JsonParser.SendMessage("Hello Thijs.");
					JsonParser.SendJsonMessage("Test",testString);
					
			}

		};
	}
	
	public static boolean isConnected(){
		createCallback();
		if(app_preferences.getString("IP", "") != "" && app_preferences.getString("Port", "") != "")
		{
			address = "ws://"+ app_preferences.getString("IP", "") +":"+ app_preferences.getString("Port", "");	
			connection =  new Thread() {
				@Override
				public void run() {
					try {
						ioWebSocket = new IOSocket(address, callback);
						ioWebSocket.connect();
					} catch (IOException e) {
						Log.e("exeption", "" + e);
					}
				}
			};
			connection.start();
			return true;
		}
		else
			return false;
	}
	
	
	
	
}
