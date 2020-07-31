const camelCaseUtil = require('../util/camelcase.util');
const dbConfig = require('../config/db.config');
var clientBean = require('../beans/client.bean')(dbConfig.sequelize, dbConfig.Sequelize);

class ClientDAO {
    async getClientDetails(clientId) {
        var clientBn = await clientBean.findOne({ where: {id: clientId }, raw: true } );
        if(clientBn){
            console.log(camelCaseUtil.camelCase(clientBn));
            return await camelCaseUtil.camelCase(clientBn);
        }
        else {
            return "We couldn't find your result";
        }
    }
}

module.exports = ClientDAO;