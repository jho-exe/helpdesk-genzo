<?php
    /* TODO: Inicio de Sesion en la WebApp */
    session_start();

    class Conectar{
        protected $dbh;

        protected function Conexion(){
            try {
                //TODO: Cadena de Conexion Local
				//$conectar = $this->dbh = new PDO("mysql:local=localhost;dbname=genzo_mesadeayuda","root","");
                //TODO: Cadena de Conexion Produccion
                $conectar = $this->dbh = new PDO("mysql:local=genzo.cl;dbname=genzocl_mesadeayuda_prod","genzocl","7Bg;0w7IT)Qm4x");
				return $conectar;
			} catch (Exception $e) {
				print "¡Error BD!: " . $e->getMessage() . "<br/>";
				die();
			}
        }

        /* TODO: Set Name para utf 8 español - evitar tener problemas con las tildes */
        public function set_names(){
			return $this->dbh->query("SET NAMES 'utf8'");
        }

        /* TODO: Ruta o Link del proyecto */
        public static function ruta(){
            //TODO: Ruta Proyecto Local
			//return "http://localhost:80/GENZO_mesadeayuda/";
            //TODO: Ruta Proyecto Produccion
            return "https://www.genzo.cl/mesa_ayuda/";
		}

    }
?>