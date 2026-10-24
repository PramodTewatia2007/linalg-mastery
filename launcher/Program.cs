using System;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using System.Windows.Forms;

namespace LinearAlgebraLauncher
{
    static class Program
    {
        private static Process serverProcess = null;
        private static string projectDir = "";
        private static Label lblStatus;
        private static Button btnOpenBrowser;
        private static Button btnStop;

        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            // Determine root project directory
            string exeDir = AppDomain.CurrentDomain.BaseDirectory;
            if (File.Exists(Path.Combine(exeDir, "server", "index.js")))
            {
                projectDir = exeDir;
            }
            else if (File.Exists(Path.Combine(exeDir, "..", "server", "index.js")))
            {
                projectDir = Path.GetFullPath(Path.Combine(exeDir, ".."));
            }
            else
            {
                projectDir = @"C:\Users\Pramod\.gemini\antigravity\scratch\linalg-mastery";
            }

            // Build main controller form
            Form form = new Form();
            form.Text = "Linear Algebra Mastery";
            form.Size = new Size(460, 280);
            form.StartPosition = FormStartPosition.CenterScreen;
            form.FormBorderStyle = FormBorderStyle.FixedDialog;
            form.MaximizeBox = false;
            form.BackColor = Color.FromArgb(11, 17, 32); // Slate 950
            form.ForeColor = Color.FromArgb(241, 245, 249);

            // App Icon / Title Header
            Label lblTitle = new Label();
            lblTitle.Text = "Linear Algebra Mastery";
            lblTitle.Font = new Font("Segoe UI", 14, FontStyle.Bold);
            lblTitle.ForeColor = Color.White;
            lblTitle.Location = new Point(24, 20);
            lblTitle.AutoSize = true;
            form.Controls.Add(lblTitle);

            Label lblSubtitle = new Label();
            lblSubtitle.Text = "Rigorous Learning Platform • English & Hinglish • 3D Visuals";
            lblSubtitle.Font = new Font("Segoe UI", 8.5f, FontStyle.Regular);
            lblSubtitle.ForeColor = Color.FromArgb(148, 163, 184); // Slate 400
            lblSubtitle.Location = new Point(25, 48);
            lblSubtitle.AutoSize = true;
            form.Controls.Add(lblSubtitle);

            // Status Box
            Panel pnlStatus = new Panel();
            pnlStatus.BackColor = Color.FromArgb(15, 23, 42); // Slate 900
            pnlStatus.Location = new Point(24, 80);
            pnlStatus.Size = new Size(396, 52);
            pnlStatus.BorderStyle = BorderStyle.FixedSingle;

            lblStatus = new Label();
            lblStatus.Text = "⏳ Initializing application server...";
            lblStatus.Font = new Font("Segoe UI", 9.5f, FontStyle.Regular);
            lblStatus.ForeColor = Color.FromArgb(226, 232, 240);
            lblStatus.Location = new Point(14, 15);
            lblStatus.AutoSize = true;
            pnlStatus.Controls.Add(lblStatus);
            form.Controls.Add(pnlStatus);

            // Open in Browser Button
            btnOpenBrowser = new Button();
            btnOpenBrowser.Text = "🌐 Open in Web Browser";
            btnOpenBrowser.Font = new Font("Segoe UI", 9.5f, FontStyle.Bold);
            btnOpenBrowser.BackColor = Color.FromArgb(79, 70, 229); // Indigo 600
            btnOpenBrowser.ForeColor = Color.White;
            btnOpenBrowser.FlatStyle = FlatStyle.Flat;
            btnOpenBrowser.FlatAppearance.BorderSize = 0;
            btnOpenBrowser.Location = new Point(24, 150);
            btnOpenBrowser.Size = new Size(240, 42);
            btnOpenBrowser.Cursor = Cursors.Hand;
            btnOpenBrowser.Click += (s, e) => OpenBrowser();
            form.Controls.Add(btnOpenBrowser);

            // Stop / Exit Button
            btnStop = new Button();
            btnStop.Text = "Stop & Exit";
            btnStop.Font = new Font("Segoe UI", 9f, FontStyle.Regular);
            btnStop.BackColor = Color.FromArgb(30, 41, 59); // Slate 800
            btnStop.ForeColor = Color.FromArgb(203, 213, 225);
            btnStop.FlatStyle = FlatStyle.Flat;
            btnStop.FlatAppearance.BorderSize = 1;
            btnStop.FlatAppearance.BorderColor = Color.FromArgb(51, 65, 85);
            btnStop.Location = new Point(280, 150);
            btnStop.Size = new Size(140, 42);
            btnStop.Cursor = Cursors.Hand;
            btnStop.Click += (s, e) => form.Close();
            form.Controls.Add(btnStop);

            // Footer info
            Label lblFooter = new Label();
            lblFooter.Text = "192 Solved Examples • 552 Practice Questions • Local Storage Persisted";
            lblFooter.Font = new Font("Segoe UI", 7.5f, FontStyle.Regular);
            lblFooter.ForeColor = Color.FromArgb(100, 116, 139);
            lblFooter.Location = new Point(24, 210);
            lblFooter.AutoSize = true;
            form.Controls.Add(lblFooter);

            // Startup background worker thread
            Thread starterThread = new Thread(() =>
            {
                EnsureServerRunning();
                form.Invoke((MethodInvoker)delegate
                {
                    lblStatus.Text = "🟢 Server Active on http://localhost:3001";
                    lblStatus.ForeColor = Color.FromArgb(52, 211, 153); // Emerald 400
                });
                OpenBrowser();
            });
            starterThread.IsBackground = true;

            form.FormClosing += (s, e) =>
            {
                KillServerProcess();
            };

            form.Shown += (s, e) =>
            {
                starterThread.Start();
            };

            Application.Run(form);
        }

        private static bool IsPortOpen(string host, int port)
        {
            try
            {
                using (var client = new TcpClient())
                {
                    var result = client.BeginConnect(host, port, null, null);
                    bool success = result.AsyncWaitHandle.WaitOne(800);
                    if (!success) return false;
                    client.EndConnect(result);
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        private static void EnsureServerRunning()
        {
            if (IsPortOpen("localhost", 3001))
            {
                return;
            }

            try
            {
                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = "node";
                psi.Arguments = "server/index.js";
                psi.WorkingDirectory = projectDir;
                psi.UseShellExecute = false;
                psi.CreateNoWindow = true;
                psi.WindowStyle = ProcessWindowStyle.Hidden;

                serverProcess = Process.Start(psi);

                // Wait up to 10 seconds for the server to listen on port 3001
                for (int i = 0; i < 20; i++)
                {
                    Thread.Sleep(500);
                    if (IsPortOpen("localhost", 3001))
                    {
                        return;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Could not start node server: " + ex.Message, "Linear Algebra Launcher Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private static void OpenBrowser()
        {
            try
            {
                Process.Start(new ProcessStartInfo("http://localhost:3001") { UseShellExecute = true });
            }
            catch
            {
                try
                {
                    Process.Start("explorer.exe", "http://localhost:3001");
                }
                catch { }
            }
        }

        private static void KillServerProcess()
        {
            if (serverProcess != null && !serverProcess.HasExited)
            {
                try
                {
                    serverProcess.Kill();
                }
                catch { }
            }
        }
    }
}
