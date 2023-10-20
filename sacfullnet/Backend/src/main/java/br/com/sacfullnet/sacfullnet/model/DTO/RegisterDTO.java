package br.com.sacfullnet.sacfullnet.model.DTO;

import br.com.sacfullnet.sacfullnet.model.UserRole;

public record RegisterDTO(String login, String password, UserRole role) {
}
