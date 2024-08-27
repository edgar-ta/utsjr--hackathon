const ConectarBD = require("./connection");
class Usuario extends ConectarBD {
    constructor() {
        super();
    }
    async obtenerUsuarioPorCorreo(correo) {
        const sql = "SELECT * FROM usuarios WHERE correo = ?";
        try {
            await this.conectarMySql();
            const [rows] = await this.conexion.execute(sql, [correo]);
            await this.cerrarConexion();
            return rows[0];
        } catch (error) {
            console.error("ERROR AL OBTENER USUARIO: " + error);
            throw error;
        }
    }

}

module.exports = Usuario;