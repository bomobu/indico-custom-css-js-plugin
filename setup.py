from setuptools import setup, find_packages

setup(
    name='indico-plugin-custom-styles',
    version='1.0',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    entry_points={
        'indico.plugins': {
            'custom_styles = custom_styles.plugin:CustomStylesPlugin'
        }
    },
    install_requires=[
        'indico'
    ],
    classifiers=[
        'Framework::Indico::Plugin',  
    ],
)