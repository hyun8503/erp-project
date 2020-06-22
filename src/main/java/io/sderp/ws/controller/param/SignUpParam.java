package io.sderp.ws.controller.param;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class SignUpParam {
    @NonNull
    private String userId;
    @NonNull
    private String userPwd;
    @NonNull
    private String userRoleId;
    @NonNull
    private List<String> userPlatformIdList;
}
