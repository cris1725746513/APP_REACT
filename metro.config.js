const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);


/*
 {preguntaActual === Preguntas.length - 1 && (
        <Button title="Enviar respuestas" onPress={() => alert('Respuestas enviadas!')}/>
      )}
*/

