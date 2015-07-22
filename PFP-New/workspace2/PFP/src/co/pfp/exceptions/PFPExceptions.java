package co.pfp.exceptions;

public class PFPExceptions extends Exception {

	private static final long serialVersionUID = 2631865023457864220L;

	public PFPExceptions() {

	}

	public PFPExceptions(String message) {
		super(message);
	}

	public PFPExceptions(String message, Throwable cause) {
		super(message, cause);
	}

}
