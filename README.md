# Indico Custom CSS & JS Plugin

## Installation Guide

Follow these steps to install the **Indico Custom CSS & JS Plugin**:

1. **Clone the repository** into the `plugins` directory:
```bash
git clone <url> plugins/
```
2. Navigate into the newly created directory:
```bash
cd plugins/custom-css-js
```
3. Install the plugin using Python command install
4. Add the plugin to the PLUGINS variable in the indico.conf file:
    - Open indico.conf and find the PLUGINS setting.
    - Add 'custom_styles' to the list of plugins.
5. Restart Indico to apply the changes

Now, the plugin should be successfully installed and activated!
