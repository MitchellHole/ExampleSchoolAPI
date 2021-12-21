import KcAdminClient from 'keycloak-admin';

const kcAdminClient = new KcAdminClient( {
  baseUrl: "http://keycloak:8080/auth"
});

async function createUser(req) {
  const user = await kcAdminClient.users.create({
    realm: 'school_demo',
    username: req.body.name.split(" ").join("_"),
    enabled: true,
    attributes: {student_number: [req.body.student_number]}
  })
  return user
}

async function resetPassword(user) {
  await kcAdminClient.users.resetPassword({
    realm: 'school_demo',
    id: user.id,
    credential: {
      temporary: false,
      type: 'password',
      value: 'password',
    },
  })
}


export default kcAdminClient;
export default createUser;
export default resetPassword;


