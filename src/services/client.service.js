const ClientDAO = require('../dao/client.dao');
class ClientService{
    async getClient(clientDetail) {
        const ClientDetails = new ClientDAO();
        const clientId = clientDetail.client_id;
        const client = await ClientDetails.getClientDetails(clientId);
        return client;
    }
}

module.exports = ClientService;