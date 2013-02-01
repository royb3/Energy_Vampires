package com.patchingzone.energyvampire;

import java.io.IOException;
import java.lang.reflect.Array;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.clwillingham.socket.io.IOMessage;
import com.clwillingham.socket.io.IOSocket;
import com.clwillingham.socket.io.IOWebSocket;
import com.clwillingham.socket.io.MessageCallback;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

public class Chat extends Activity {

	private Button btnSend;
	private Context c;
	private EditText etChat;
	private String address = "ws://192.168.8.74:2525";

	IOSocket ioWebSocket;
	MessageCallback callback;
	IOMessage msg;
	IOWebSocket sok;

	int xR;
	int yR;

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

	/** Called when the activity is first created. */
	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_chat);
		c = this;
		this.btnSend = (Button) findViewById(R.id.btnSend);
		this.etChat = (EditText) findViewById(R.id.etChat);

		this.btnSend.setOnClickListener(new OnClickListener() {

			public void onClick(View v) {
				LinearLayout ll = (LinearLayout) findViewById(R.id.ll);
				TextView tv = new TextView(c);
				tv.setWidth(ll.getWidth());
				tv.setTextColor(Color.parseColor("#FFFFFF"));
				ll.addView(tv);
				tv.setText(etChat.getText().toString());
				etChat.setText("");
			}
		});

		msg = new IOMessage(IOMessage.EVENT, -1, "", "");

		callback = new MessageCallback() {

			public void onOpen() {
			}

			public void onMessage(String message) {
			}

			public void on(String event, String data) {
			}

			public void onEvent(String message) {

				try {
					JSONObject jsonObject = new JSONObject(message);
					JSONArray jsonArray = jsonObject.getJSONArray("args");
					JSONObject jsonObject2 = jsonArray.getJSONObject(0);
					Log.d("Chat", "JSON object " + jsonObject2.toString());
					// xR = jsonObject2.getInt("x");
					// yR = jsonObject2.getInt("y");
					
					//first we get message type
					String gotMsg = jsonObject2.getString("Message");
				
					//depeding on message type then I parse this or that 
					
					
					ioWebSocket.getWebSocket().sendMessage("Hello World");
					// ioWebSocket.getWebSocket().sendMessage("this is a test");
					String messageToSend = "{\"name\":\"updateServer\",\"args\":[{\"x\":1058,\"y\":49}]}";
					ioWebSocket.getWebSocket().SendMessage(
							new IOMessage(IOMessage.EVENT, -1, "", messageToSend));

					// ioWebSocket.getWebSocket().sendMessage("Hello world!");

					Log.d("Chat", "The message is " + gotMsg);

				} catch (JSONException e) {

					// TODO Auto-generated catch block

					e.printStackTrace();

				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}

		};
		new Thread() {
			@Override
			public void run() {
				try {
					ioWebSocket = new IOSocket(address, callback);
					ioWebSocket.connect();

				} catch (IOException e) {
					Log.e("exeption", "" + e);
				}
			}
		}.start();
	}

}
