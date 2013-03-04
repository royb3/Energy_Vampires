namespace Socket.io_Winform
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.listView1 = new System.Windows.Forms.ListView();
            this.TB_Ip = new System.Windows.Forms.TextBox();
            this.BTN_Connect = new System.Windows.Forms.Button();
            this.BTN_StartGame = new System.Windows.Forms.Button();
            this.GB_Functions = new System.Windows.Forms.GroupBox();
            this.BTN_StopGame = new System.Windows.Forms.Button();
            this.GB_Functions.SuspendLayout();
            this.SuspendLayout();
            // 
            // listView1
            // 
            this.listView1.Location = new System.Drawing.Point(373, 37);
            this.listView1.Name = "listView1";
            this.listView1.Size = new System.Drawing.Size(325, 408);
            this.listView1.TabIndex = 0;
            this.listView1.UseCompatibleStateImageBehavior = false;
            // 
            // TB_Ip
            // 
            this.TB_Ip.Location = new System.Drawing.Point(12, 12);
            this.TB_Ip.Name = "TB_Ip";
            this.TB_Ip.Size = new System.Drawing.Size(100, 20);
            this.TB_Ip.TabIndex = 1;
            this.TB_Ip.Text = "192.168.0.2:2525";
            // 
            // BTN_Connect
            // 
            this.BTN_Connect.Location = new System.Drawing.Point(119, 11);
            this.BTN_Connect.Name = "BTN_Connect";
            this.BTN_Connect.Size = new System.Drawing.Size(75, 23);
            this.BTN_Connect.TabIndex = 2;
            this.BTN_Connect.Text = "Connect";
            this.BTN_Connect.UseVisualStyleBackColor = true;
            this.BTN_Connect.Click += new System.EventHandler(this.BTN_Connect_Click);
            // 
            // BTN_StartGame
            // 
            this.BTN_StartGame.Location = new System.Drawing.Point(6, 19);
            this.BTN_StartGame.Name = "BTN_StartGame";
            this.BTN_StartGame.Size = new System.Drawing.Size(75, 23);
            this.BTN_StartGame.TabIndex = 3;
            this.BTN_StartGame.Text = "StartGame";
            this.BTN_StartGame.UseVisualStyleBackColor = true;
            this.BTN_StartGame.Click += new System.EventHandler(this.BTN_StartGame_Click);
            // 
            // GB_Functions
            // 
            this.GB_Functions.Controls.Add(this.BTN_StopGame);
            this.GB_Functions.Controls.Add(this.BTN_StartGame);
            this.GB_Functions.Location = new System.Drawing.Point(12, 49);
            this.GB_Functions.Name = "GB_Functions";
            this.GB_Functions.Size = new System.Drawing.Size(182, 93);
            this.GB_Functions.TabIndex = 4;
            this.GB_Functions.TabStop = false;
            this.GB_Functions.Text = "Functions";
            // 
            // BTN_StopGame
            // 
            this.BTN_StopGame.Location = new System.Drawing.Point(7, 49);
            this.BTN_StopGame.Name = "BTN_StopGame";
            this.BTN_StopGame.Size = new System.Drawing.Size(75, 23);
            this.BTN_StopGame.TabIndex = 4;
            this.BTN_StopGame.Text = "Stop Game";
            this.BTN_StopGame.UseVisualStyleBackColor = true;
            this.BTN_StopGame.Click += new System.EventHandler(this.BTN_StopGame_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(212, 162);
            this.Controls.Add(this.GB_Functions);
            this.Controls.Add(this.BTN_Connect);
            this.Controls.Add(this.TB_Ip);
            this.Controls.Add(this.listView1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.GB_Functions.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListView listView1;
        private System.Windows.Forms.TextBox TB_Ip;
        private System.Windows.Forms.Button BTN_Connect;
        private System.Windows.Forms.Button BTN_StartGame;
        private System.Windows.Forms.GroupBox GB_Functions;
        private System.Windows.Forms.Button BTN_StopGame;
    }
}

