package co.pfp.rest.services;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.sun.xml.internal.ws.util.StringUtils;

import jersey.repackaged.com.google.common.base.Joiner;
import co.pfp.dao.TemplateDAO;
import co.pfp.entities.RunApp;
import co.pfp.entities.TemplateVO;
import co.pfp.exceptions.PFPExceptions;
import co.pfp.utils.PFPResponse;

@Path("/template")
public class TemplateRESTService {

	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse addTemplate(TemplateVO template) {

		TemplateDAO dao = new TemplateDAO();
		PFPResponse resp = new PFPResponse();

		try {
			template = dao.addTemplate(template);
			resp.setStatus("SUCCESS");
			resp.setData(template);
		} catch (PFPExceptions e) {
			resp.setStatus("ERROR");
			resp.setMsg(e.getMessage());
		}

		return resp;
	}

	@GET
	@Path("/get/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse getTemplate(@PathParam("id") int id) {

		TemplateDAO dao = new TemplateDAO();
		PFPResponse resp = new PFPResponse();

		try {
			TemplateVO template = dao.getTemplate(id);
			resp.setStatus("SUCCESS");
			resp.setData(template);
		} catch (PFPExceptions e) {
			resp.setStatus("ERROR");
			resp.setMsg(e.getMessage());
		}

		return resp;
	}

	@GET
	@Path("/getFile/{country}/{platform}/{sensor}")
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse getFile(@PathParam("country") String country,
			@PathParam("platform") String platform,
			@PathParam("sensor") String sensor) {

		TemplateDAO dao = new TemplateDAO();
		PFPResponse resp = new PFPResponse();

		try {
			TemplateVO template = dao.getFile(country, platform, sensor);
			resp.setStatus("SUCCESS");
			resp.setData(template);
		} catch (PFPExceptions e) {
			resp.setStatus("ERROR");
			resp.setMsg(e.getMessage());
		}

		return resp;
	}

	@GET
	@Path("/getAll")
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse getAllTemplates() {
		TemplateDAO dao = new TemplateDAO();
		PFPResponse resp = new PFPResponse();

		try {
			List<TemplateVO> list = dao.getAllTemplates();
			resp.setStatus("SUCCESS");
			resp.setData(list);
		} catch (PFPExceptions e) {
			resp.setStatus("ERROR");
			resp.setMsg(e.getMessage());
		}

		return resp;
	}

	@POST
	@Path("/delete/{id}")
	public PFPResponse deleteTarget(@PathParam("id") int id) {

		TemplateDAO dao = new TemplateDAO();
		PFPResponse resp = new PFPResponse();
		List<TemplateVO> targets = null;
		try {
			targets = dao.deleteTemplate(id);
			resp.setStatus("SUCCESS");
			resp.setData(targets);
		} catch (PFPExceptions e) {
			resp.setStatus("ERROR");
			resp.setMsg(e.getMessage());
		}

		return resp;
	}

	@POST
	@Path("/update")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse updatePerson(TemplateVO template) {

		TemplateDAO dao = new TemplateDAO();
		PFPResponse resp = new PFPResponse();
		try {
			template = dao.updateTemplate(template);
			resp.setStatus("SUCCESS");
			resp.setData(template);
		} catch (PFPExceptions e) {
			resp.setStatus("ERROR");
			resp.setMsg(e.getMessage());
		}
		return resp;
	}

	@POST
	@Path("/socket")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse socket() {
		PFPResponse resp = new PFPResponse();
		RunApp ra = new RunApp();
		// File file = new
		// File("P:\\PFPToNxtLevel\\HG5-0201_Iraq_4Feb2015\\HG5-0201_F0208_30L.ntf");

		// RunApp.open(file);
		boolean success = ra.socket();
		if (success) {
			resp.setStatus("SUCCESS");
		} else {
			resp.setStatus("FAILURE");
		}
		return resp;

		// ra.myApp();
	}

	@POST
	@Path("/redact/{path}/{c}/{r}/{s}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse redact(@PathParam("path") String path,
			@PathParam("c") String c, @PathParam("r") String r,
			@PathParam("s") String s) {
		PFPResponse resp = new PFPResponse();
		RunApp ra = new RunApp();
		String[] pathValues = path.split("!");
		String newPath = String.join("\\", pathValues);
		System.out.println(c + r + s);
		boolean success = ra.redact(newPath, c, r, s);
		if (success) {
			resp.setStatus("SUCCESS");
		} else {
			resp.setStatus("FAILURE");
		}
		return resp;
	}

	@POST
	@Path("/redactEditor")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public PFPResponse redactEditor() {
		PFPResponse resp = new PFPResponse();
		RunApp ra = new RunApp();
		boolean success = ra.redactEditor();
		if (success) {
			resp.setStatus("SUCCESS");
		} else {
			resp.setStatus("FAILURE");
		}
		return resp;
	}
}
