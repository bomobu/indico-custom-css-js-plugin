from indico.core.plugins import IndicoPlugin
from flask import request, current_app, redirect, url_for

class CustomStylesPlugin(IndicoPlugin):
    """Custom Styles Plugin"""

    def init(self):
        super().init()
        self.logger.info("CustomStylesPlugin initialized.")

        # URLs estáticas para el CSS y JS
        self.css_url = '/static/plugins/custom_styles/css/custom.css'
        self.js_login_url = '/static/plugins/custom_styles/js/custom_login.js'
        self.js_abstract_url = '/static/plugins/custom_styles/js/custom_abstract.js'

        # Registra el hook para modificar las respuestas
        current_app.after_request(self.modify_response)
        self.logger.info("after_request hook registered to inject CSS/JS.")

    def modify_response(self, response):
        """
        Modifica las respuestas HTML para inyectar CSS en todas las páginas
        y JS solo en la página de login.
        """
        # Asegúrate de que la respuesta sea HTML
        if response.content_type.startswith("text/html"):
            response_data = response.get_data(as_text=True)

            # Inyectar el CSS en todas las páginas (si no está ya presente)
            if f'href="{self.css_url}"' not in response_data:
                response_data = response_data.replace(
                    '</head>',
                    f'<link rel="stylesheet" type="text/css" href="{self.css_url}"></head>'
                )

            # Inyectar el JS solo en la página de login
            if request.endpoint == 'auth.login':  # Verifica si estamos en la página de login
                if f'src="{self.js_login_url}"' not in response_data:
                    response_data = response_data.replace(
                        '</head>',
                        f'<script src="{self.js_login_url}"></script></head>'
                    )

            # Inyectar el JS solo en la página de abstract
            if request.endpoint == 'abstracts.call_for_abstracts': 
                if f'src="{self.js_abstract_url}"' not in response_data:
                    response_data = response_data.replace(
                        '</head>',
                        f'<script src="{self.js_abstract_url}"></script></head>'
                    )

            # Actualizar el contenido de la respuesta
            response.set_data(response_data)

        return response