'use strict';

angular.module('forms').config(['$translateProvider', function ($translateProvider) {

	$translateProvider.translations('es', {

		//Configure Form Tab View
		ADVANCED_SETTINGS: 'Configuraciones avanzadas',
		FORM_NAME: 'Nombre del formulario',
		FORM_STATUS: 'Estado del formulario',
		PUBLIC: 'Publico',
		PRIVATE: 'Privado',
		GA_TRACKING_CODE: 'Código de Google Analytics',
		DISPLAY_FOOTER: '¿Mostrar pie de página?',
		SAVE_CHANGES: 'Grabar',
		CANCEL: 'Cancelar',
		DISPLAY_START_PAGE: '¿Mostrar página de inicio?',
		DISPLAY_END_PAGE: '¿Mostrar paǵina de fin?',

		//List Forms View
		CREATE_A_NEW_FORM: 'Crear un formulario nuevo',
		CREATE_FORM: 'Crear formulario',
		CREATED_ON: 'Creado en',

		//Edit Field Modal
		EDIT_FIELD: 'Editar este campo',
		SAVE_FIELD: 'Grabar',
		ON: 'ON',
		OFF: 'OFF',
		REQUIRED_FIELD: 'Requerido',
		LOGIC_JUMP: 'Salto lógico',
		SHOW_BUTTONS: 'Botones adicionales',
		SAVE_START_PAGE: 'Grabar',

		//Admin Form View
		ARE_YOU_SURE: '¿Estas absolutamente seguro?',
		READ_WARNING: '¡Algo malo ocurrira si no lees esto!',
		DELETE_WARNING1: 'Esta acción no tiene vuelta atrás. Esto borrara permanentemente el "',
		DELETE_WARNING2: '" formulario y todos los datos asociados.',
		DELETE_CONFIRM: 'Por favor escribi el bonbre del formulario para confirmar.',
		I_UNDERSTAND: 'Entiendo las consecuencias y quiero borrarlo.',
		DELETE_FORM_SM: 'Borrar',
		DELETE_FORM_MD: 'Borrar formulario',
		DELETE: 'Borrar',
		FORM: 'Formulario',
		VIEW: 'Vista',
		LIVE: 'Online',
		PREVIEW: 'Vista previa',

		//Edit Form View
		DISABLED: 'Deshabilitado',
		YES: 'SI',
		NO: 'NO',
		ADD_LOGIC_JUMP: 'Agregar salto lógico',
		ADD_FIELD_LG: 'Click para agregar campo',
		ADD_FIELD_MD: 'Agregar nuevo campo',
		ADD_FIELD_SM: 'Agregar campo',
		EDIT_START_PAGE: 'Editar paǵina de inicio',
		EDIT_END_PAGE: 'Editar página de finalización',
		WELCOME_SCREEN: 'Comienzo',
		END_SCREEN: 'Fin',
		INTRO_TITLE: 'Titulo',
		INTRO_PARAGRAPH: 'Paragrafo',
		INTRO_BTN: 'Botón de comienzo',
		TITLE: 'Titulo',
		PARAGRAPH: 'Paragrafo',
		BTN_TEXT: 'Botón para volver atrás',
		BUTTONS: 'Butones',
		BUTTON_TEXT: 'Texto',
		BUTTON_LINK: 'Link',
		ADD_BUTTON: 'Agregar Botón',
		PREVIEW_FIELD: 'Vista previa Pregunta',
		QUESTION_TITLE: 'Titulo',
		QUESTION_DESCRIPTION: 'Descripción',
		OPTIONS: 'Opciones',
		ADD_OPTION: 'Agregar Opciones',
		NUM_OF_STEPS: 'Cantidad de pasos',
		CLICK_FIELDS_FOOTER: 'Click en los campos para agregar',

		//Edit Submissions View
		TOTAL_VIEWS: 'Total de visitas únicas',
		RESPONSES: 'respuestas',
		COMPLETION_RATE: 'Taza de terminación',
		AVERAGE_TIME_TO_COMPLETE: 'Promedio de tiempo de rellanado',

		DESKTOP_AND_LAPTOP: 'Computadora',
		TABLETS: 'Tablets',
		PHONES: 'Moviles',
		OTHER: 'Otros',
		UNIQUE_VISITS: 'Visitas únicas',

		FIELD_TITLE: 'Titulo de campo',
		FIELD_VIEWS: 'Vistas de campo',
		FIELD_DROPOFF: 'Finalización de campo',
		FIELD_RESPONSES: 'Respuestas de campo',
		DELETE_SELECTED: 'Borrar selección',
		EXPORT_TO_EXCEL: 'Exportar a Excel',
		EXPORT_TO_CSV: 'Exportar a CSV',
		EXPORT_TO_JSON: 'Exportar a JSON',
		PERCENTAGE_COMPLETE: 'Porcentaje de completitud',
		TIME_ELAPSED: 'Tiempo usado',
		DEVICE: 'Dispositivo',
		LOCATION: 'Lugar',
		IP_ADDRESS: 'Dirección IP',
		DATE_SUBMITTED: 'Fecha de envío',
		GENERATED_PDF: 'PDF generado',

		//Design View
		BACKGROUND_COLOR: 'Color de fondo',
		DESIGN_HEADER: 'Cambiar diseño de formulario',
		QUESTION_TEXT_COLOR: 'Color de la pregunta',
		ANSWER_TEXT_COLOR: 'Color de la respuesta',
		BTN_BACKGROUND_COLOR: 'Color de fondo del botón',
		BTN_TEXT_COLOR: 'Color del texto del botón',

		//Admin Tabs
		CREATE_TAB: 'Crear',
		DESIGN_TAB: 'Diseño',
		CONFIGURE_TAB: 'Configuración',
		ANALYZE_TAB: 'Analisis'

	});
}]);
