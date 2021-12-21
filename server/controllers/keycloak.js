import KcAdminClient from 'keycloak-admin';

const keycloakActions = {

  async createStudent(req) {
    let kcAdminClient = new KcAdminClient({
      baseUrl: "http://keycloak:8080/auth"
    });
    await this.awaitAuth(kcAdminClient)
    const user = await kcAdminClient.users.create({
      realm: 'school_demo',
      username: req.body.name.split(" ").join("_"),
      enabled: true,
      attributes: {student_number: [req.body.student_number]}
    })
    return user
  },

  async resetPassword(user) {
    let kcAdminClient = new KcAdminClient({
      baseUrl: "http://keycloak:8080/auth"
    });
    await this.awaitAuth(kcAdminClient)
    await kcAdminClient.users.resetPassword({
      realm: 'school_demo',
      id: user.id,
      credential: {
        temporary: false,
        type: 'password',
        value: 'password',
      },
    })
  },

  async awaitAuth(kcAdminClient) {
    await kcAdminClient.auth({
      username: 'admin',
      password: 'admin',
      grantType: 'password',
      clientId: 'admin-cli'
    });
  }

}


export default keycloakActions;


