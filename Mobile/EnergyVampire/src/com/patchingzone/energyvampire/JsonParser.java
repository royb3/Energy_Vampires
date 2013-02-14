package com.patchingzone.energyvampire;

import java.io.IOException;
import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.util.Log;

import com.clwillingham.socket.io.IOMessage;
import com.clwillingham.socket.io.IOWebSocket;

public class JsonParser {
	
	public JsonParser(){
		
	}
	
	public static void SendMessage(String Message)
	{
		try {
			
			Connect.ioWebSocket.getWebSocket().sendMessage(Message);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void SendJsonMessage(String Name,String[] Values)
	{	
		try {
			Log.d("QW", "" + Connect.ioWebSocket);
			Connect.ioWebSocket.getWebSocket().sendMessage((new JSONObject().put("args",Arrays.toString(Values)).put("name", Name))+"");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static String Parse(String Message)
	{
		try{
		JSONObject jsonObject = new JSONObject(Message);
		JSONArray jsonArray = jsonObject.getJSONArray("args");
		JSONObject jsonObject2 = jsonArray.getJSONObject(0);
		
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
