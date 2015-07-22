package co.pfp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import co.pfp.entities.UserVO;
import co.pfp.exceptions.PFPExceptions;
import co.pfp.utils.DBConnector;

public class UserDAO {
	public List<UserVO> getAllUsers() throws PFPExceptions {

		Connection con = DBConnector.getDBConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		List<UserVO> users = new ArrayList<UserVO>();

		try {
			ps = con.prepareStatement("SELECT * FROM users");
			rs = ps.executeQuery();

			while (rs.next()) {
				UserVO user = new UserVO();
				user.setId(rs.getInt("Userid"));
				user.setUsername(rs.getString("username"));
				user.setPassword(rs.getString("password"));
				users.add(user);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new PFPExceptions("Error: " + e.getMessage(), e.getCause());
		} finally {
			DBConnector.closeResources(ps, rs, con);
		}

		return users;
	}
}
