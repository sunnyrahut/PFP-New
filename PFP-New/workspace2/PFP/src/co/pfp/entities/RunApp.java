package co.pfp.entities;

import java.awt.Desktop;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

public class RunApp {
	public boolean socket() {
		try {
			Runtime.getRuntime()
					.exec("C:\\Program Files\\BAE SYSTEMS\\SOCET GXP 4.1.0\\Exe\\StartSocetGxp.exe");
			String line;
			Process p = Runtime.getRuntime().exec("tasklist.exe");
			BufferedReader input = new BufferedReader(new InputStreamReader(
					p.getInputStream()));
			while ((line = input.readLine()) != null) {
				System.out.println(line);
			}
			input.close();
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	public boolean redact(String path, String classification,
			String releasability, String sensor) {

		String command = "java -Dredaction.path="
				+ "\"C:\\Users\\ToNxtLevel\\my Documents\\Redact\""
				+ " -jar "
				+ "\"C:\\Users\\ToNxtLevel\\my Documents\\Redact\\redact-0.12.0.2.jar\""
				+ " -c " + classification + " -r " + releasability + " -s "
				+ sensor + " \"" + path + "\""
				+ " \"c:\\users\\tonxtlevel\\sample_redact_new.ntf\"";
		String folder = "C:\\Users\\ToNxtLevel\\My Documents\\Redact\\rulesets";
		System.out.println(command);
		try {
			Runtime rt = Runtime.getRuntime();
			rt.exec("cmd.exe /c cd \"" + folder + "\" & start cmd.exe /k"
					+ command);
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	public boolean redactEditor() {

		String file = "C:\\Users\\ToNxtLevel\\My Documents\\Redact\\redactionruleseditor.bat";
		try {
			Runtime rt = Runtime.getRuntime();
			rt.exec(file);
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}

	public static void open(File document) throws IOException {
		Desktop dt = Desktop.getDesktop();
		dt.open(document);
	}
}