package co.pfp.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import co.pfp.entities.TemplateVO;
import co.pfp.exceptions.PFPExceptions;
import co.pfp.utils.DBConnector;

public class TemplateDAO {

	public TemplateVO addTemplate(TemplateVO template) throws PFPExceptions {

		Connection conn = DBConnector.getDBConnection();
		PreparedStatement preStmt = null;
		ResultSet rs = null;
		try {
			preStmt = conn.prepareStatement(
					"INSERT INTO MMTable VALUES(?,?,?,?,?,?)",
					PreparedStatement.RETURN_GENERATED_KEYS);
			preStmt.setString(1, template.getTemplateCountry());
			preStmt.setString(2, template.getRules());
			preStmt.setString(3, template.getSensor());
			preStmt.setString(4, template.getComments());
			preStmt.setString(5, template.getTemplateFile());
			preStmt.setString(6, template.getStatus());

			preStmt.executeUpdate();
			rs = preStmt.getGeneratedKeys();

		} catch (SQLException e) {
			System.err.println("Error " + e.getMessage());
			e.getStackTrace();
			throw new PFPExceptions("Error: " + e.getMessage(), e.getCause());
		} finally {
			DBConnector.closeResources(preStmt, rs, conn);
		}

		return template;
	}

	public TemplateVO getTemplate(int id) throws PFPExceptions {

		Connection con = DBConnector.getDBConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		TemplateVO template = new TemplateVO();

		try {
			ps = con.prepareStatement("SELECT * FROM MMTable WHERE templateID=?");
			ps.setInt(1, id);
			;
			rs = ps.executeQuery();

			if (rs.next()) {
				template.setTemplateId(rs.getInt("templateID"));
				template.setTemplateCountry(rs.getString("country"));
				template.setTemplateFile(rs.getString("template"));
				template.setStatus(rs.getString("FDOstatus"));
				template.setRules(rs.getString("rulesPlatform"));
				template.setComments(rs.getString("comments"));
				template.setSensor(rs.getString("sensor"));

			} else {
				throw new PFPExceptions("Template with the ID=" + id
						+ " not found in the system.");
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new PFPExceptions("Error: " + e.getMessage(), e.getCause());
		} finally {
			DBConnector.closeResources(ps, rs, con);
		}

		return template;
	}

	public TemplateVO getFile(String country, String platform, String sensor)
			throws PFPExceptions {

		Connection con = DBConnector.getDBConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		TemplateVO template = new TemplateVO();

		try {
			ps = con.prepareStatement("SELECT * FROM MMTable WHERE country=? AND rulesPlatform=? AND sensor=?");
			ps.setString(1, country);
			ps.setString(2, platform);
			ps.setString(3, sensor);
			;
			rs = ps.executeQuery();

			if (rs.next()) {
				template.setTemplateId(rs.getInt("templateID"));
				template.setTemplateCountry(rs.getString("country"));
				template.setTemplateFile(rs.getString("template"));
				template.setStatus(rs.getString("FDOstatus"));
				template.setRules(rs.getString("rulesPlatform"));
				template.setComments(rs.getString("comments"));
				template.setSensor(rs.getString("sensor"));
				template.setTemplateFile(rs.getString("template"));

			} else {
				throw new PFPExceptions("Template with the country = "
						+ country + " platform =" + platform + " sensor = "
						+ sensor + " not found in the system.");
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new PFPExceptions("Error: " + e.getMessage(), e.getCause());
		} finally {
			DBConnector.closeResources(ps, rs, con);
		}

		return template;
	}

	public List<TemplateVO> getAllTemplates() throws PFPExceptions {

		Connection con = DBConnector.getDBConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;

		List<TemplateVO> templates = new ArrayList<TemplateVO>();

		try {
			ps = con.prepareStatement("SELECT * FROM MMTable");
			rs = ps.executeQuery();

			while (rs.next()) {
				TemplateVO template = new TemplateVO();
				template.setTemplateId(rs.getInt("templateID"));
				template.setTemplateCountry(rs.getString("country"));
				template.setTemplateFile(rs.getString("template"));
				template.setStatus(rs.getString("FDOstatus"));
				template.setComments(rs.getString("comments"));
				template.setRules(rs.getString("rulesPlatform"));
				template.setSensor(rs.getString("sensor"));
				templates.add(template);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			throw new PFPExceptions("Error: " + e.getMessage(), e.getCause());
		} finally {
			DBConnector.closeResources(ps, rs, con);
		}

		return templates;
	}

	public TemplateVO updateTemplate(TemplateVO template) throws PFPExceptions {

		Connection conn = DBConnector.getDBConnection();
		PreparedStatement preStmt = null;
		ResultSet rs = null;
		try {
			preStmt = conn
					.prepareStatement(
							"UPDATE MMTable SET template=?, FDOstatus=?, country=?, sensor=?, comments=?, rulesPlatform=? WHERE templateID=?",
							PreparedStatement.RETURN_GENERATED_KEYS);
			preStmt.setString(1, template.getTemplateFile());
			preStmt.setString(2, template.getStatus());
			preStmt.setString(3, template.getTemplateCountry());
			preStmt.setString(4, template.getSensor());
			preStmt.setString(5, template.getComments());
			preStmt.setString(6, template.getRules());
			preStmt.setInt(7, template.getTemplateId());

			if (preStmt.executeUpdate() <= 0) {
				throw new PFPExceptions("Template with the id="
						+ template.getTemplateId()
						+ " not found in the system.");
			}
		} catch (SQLException e) {
			System.err.println("Error " + e.getMessage());
			e.getStackTrace();
			throw new PFPExceptions("Error: " + e.getMessage(), e.getCause());
		} finally {
			DBConnector.closeResources(preStmt, rs, conn);
		}
		return template;
	}

	public List<TemplateVO> deleteTemplate(int id) throws PFPExceptions {

		Connection conn = DBConnector.getDBConnection();
		PreparedStatement preStmt = null;
		ResultSet rs = null;
		List<TemplateVO> templates = new ArrayList<TemplateVO>();

		try {
			preStmt = conn.prepareStatement(
					"DELETE FROM MMTable WHERE templateID=?",
					PreparedStatement.RETURN_GENERATED_KEYS);
			preStmt.setInt(1, id);
			if (preStmt.executeUpdate() <= 0) {
				throw new PFPExceptions("Template with the id=" + id
						+ " not found in the system.");
			}
			rs = conn.prepareStatement("SELECT * FROM MMTable",
					PreparedStatement.RETURN_GENERATED_KEYS).executeQuery();
			while (rs.next()) {
				TemplateVO template = new TemplateVO();
				template.setTemplateId(rs.getInt("templateID"));
				template.setTemplateCountry(rs.getString("country"));
				template.setTemplateFile(rs.getString("template"));
				template.setStatus(rs.getString("FDOstatus"));
				template.setComments(rs.getString("comments"));
				template.setRules(rs.getString("rulesPlatform"));
				template.setSensor(rs.getString("sensor"));
				templates.add(template);
			}
		} catch (SQLException e) {
			System.err.println("Error " + e.getMessage());
			e.getStackTrace();
			throw new PFPExceptions("Error:" + e.getMessage(), e.getCause());
		} finally {
			DBConnector.closeResources(preStmt, rs, conn);
		}
		return templates;
	}
}
