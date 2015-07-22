package co.pfp.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import co.pfp.exceptions.PFPExceptions;

public class DBConnector {
	private final static String DBURL = "jdbc:sqlserver://DR20454V0\\SQLEXPRESS;databaseName=pfp;integratedSecurity=true";

	public static Connection getDBConnection() throws PFPExceptions {

		try {
			Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		Connection conn = null;

		try {
			conn = DriverManager.getConnection(DBURL);
			System.out.println("Connected to the database: " + conn);
		} catch (SQLException e) {
			System.err.println("Connection Error" + e.getMessage());
			e.printStackTrace();
			throw new PFPExceptions("Error: " + e.getMessage(), e.getCause());
		}

		return conn;
	}

	public static void closeResources(PreparedStatement ps, ResultSet rs,
			Connection conn) {

		try {
			if (ps != null) {
				ps.close();
			}
			if (rs != null) {
				rs.close();
			}
			if (conn != null) {
				conn.close();
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
	try {
		Connection con =DBConnector.getDBConnection();
	} catch (PFPExceptions e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}	
	}
}
