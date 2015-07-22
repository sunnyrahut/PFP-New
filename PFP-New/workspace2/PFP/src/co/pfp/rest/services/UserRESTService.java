package co.pfp.rest.services;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import co.pfp.dao.UserDAO;
import co.pfp.entities.UserVO;
import co.pfp.exceptions.PFPExceptions;
import co.pfp.utils.PFPResponse;

@Path("/users")
public class UserRESTService {
	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse getAllUsers() {
		UserDAO dao = new UserDAO();
		PFPResponse resp = new PFPResponse();

		try {
			List<UserVO> list = dao.getAllUsers();
			resp.setStatus("SUCCESS");
			resp.setData(list);
		} catch (PFPExceptions e) {
			resp.setStatus("ERROR");
			resp.setMsg(e.getMessage());
		}

		return resp;
	}
}
