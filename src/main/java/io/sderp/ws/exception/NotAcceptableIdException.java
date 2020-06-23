package io.sderp.ws.exception;

import org.springframework.http.HttpStatus;

public class NotAcceptableIdException extends BaseException {
    public NotAcceptableIdException(String id) {
        super(ErrorCode.NOT_ACCEPTABLE_ID, HttpStatus.BAD_REQUEST, "Not acceptable id : " + id);
    }
}
