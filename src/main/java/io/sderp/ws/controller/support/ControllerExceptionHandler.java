package io.sderp.ws.controller.support;

import io.sderp.ws.exception.BaseException;
import io.sderp.ws.exception.ErrorCode;
import io.sderp.ws.exception.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(ControllerExceptionHandler.class);

    @ExceptionHandler(BaseException.class)
    public ResponseEntity<ErrorResponse> handleBaseException(HttpServletRequest httpRequest, BaseException ex) {
        final HttpStatus status = ex.getStatus();
        final ErrorResponse response = getErrorResponse(ex, httpRequest, status);

        return new ResponseEntity<>(response, status);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        HttpServletRequest httpServletRequest = null;
        if(request instanceof ServletWebRequest) {
            httpServletRequest = ((ServletWebRequest) request).getNativeRequest(HttpServletRequest.class);
        }
        final ErrorResponse response = getErrorResponse(ex, httpServletRequest, status);

        return new ResponseEntity<>(response, status);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleUnknownException(HttpServletRequest httpRequest, Exception ex) {
        final HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        final ErrorResponse response = getErrorResponse(ex, httpRequest, status);

        return new ResponseEntity<>(response, status);
    }

    private ErrorResponse getErrorResponse(Exception ex, HttpServletRequest httpServletRequest, HttpStatus status) {
        ErrorCode errorCode = ErrorCode.UNKNOWN;
        if(ex instanceof BaseException) {
            errorCode = ((BaseException) ex).getErrorCode();
        }

        String requestPath = "";
        if(httpServletRequest != null) {
            requestPath = httpServletRequest.getRequestURI();

            if (httpServletRequest.getQueryString() != null) {
                requestPath += "?" + httpServletRequest.getQueryString();
            }
        }
        String remoteAddress = "";
        if(httpServletRequest != null) {
            remoteAddress = httpServletRequest.getRemoteAddr();
        }

        final ErrorResponse response = ErrorResponse.builder()
                .timestamp(LocalDateTime.now())
                .code(errorCode)
                .status(status.value())
                .error(status.getReasonPhrase())
                .message(ex.getLocalizedMessage())
                .path(requestPath)
                .build();

        logger.info("HTTP Response [{} {}] to {} : {}", status.value(), status.name(), remoteAddress, response);

        return response;
    }
}
