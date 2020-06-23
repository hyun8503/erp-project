package io.sderp.ws.exception;

import org.springframework.http.HttpStatus;

public class CanNotFoundUserException extends BaseException {
    public CanNotFoundUserException() {
        super(ErrorCode.CAN_NOT_FOUND_USER, HttpStatus.BAD_REQUEST, "Can not found user");
    }

    public CanNotFoundUserException(String id) {
        super(ErrorCode.CAN_NOT_FOUND_USER, HttpStatus.BAD_REQUEST, "Can not found user : " + id);
    }
}
