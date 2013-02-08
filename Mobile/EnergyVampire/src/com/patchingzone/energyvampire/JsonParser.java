package com.patchingzone.energyvampire;

import java.io.IOException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.clwillingham.socket.io.IOMessage;

public class JsonParser {
	
	public JsonParser(){
		
	}
	
	public static void SendMessage(String Message)
	{
		try {
			Chat.ioWebSocket.getWebSocket().sendMessage(Message);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void SendJsonMessage(String Name,String[] Values)
	{	
		/*
		String messageToSend = "{\"name\":\""  + Name + "\",\"args\":[{";
		for(String value : Values)
		{
			if(value == Values[0])
			{
				messageToSend += "\"" + value;
			}
			else
			{
				messageToSend += "\",\"" + value;
			}
			
		}
		
		messageToSend += "\"}]";
		
		try {
			Chat.ioWebSocket.getWebSocket().SendMessage(
					new IOMessage(IOMessage.EVENT, -1, "", messageToSend));
		} catch (IOException e) {
			Log.e("JSON","cant send JSON message" + e);
		}*/
		
		//Chat.ioWebSocket.emit(new JSONObject().put("name", Name).put("args",Values));
	}
	
	public static String Parse(String Message)
	{
		try{
		JSONObject jsonObject = new JSONObject(Message);
		JSONArray jsonArray = jsonObject.getJSONArray("args");
		JSONObject jsonObject2 = jsonArray.getJSONObject(0);
		
		//henny let op de HOOFDLETTERS
		String gotMsg = jsonObject2.getString("message");
		
		Log.d("Chat", "The message is " + gotMsg);
		return gotMsg;
		
		}
		catch(JSONException Jex)
		{
			Log.d("error", "Message not parsed " + Jex);
			return Jex.toString();
		}
	}
}
