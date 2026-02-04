import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  PixelRatio,
} from 'react-native';
import { XoaltView } from '../XoaltSDK';

export function DebugScreen() {
  const window = Dimensions.get('window');

  const [tempWidth, setTempWidth] = useState('728');
  const [tempHeight, setTempHeight] = useState('90');
  const [tempId, setTempId] = useState('33962');

  const [width, setWidth] = useState(728);
  const [height, setHeight] = useState(90);
  const [id, setId] = useState('33962');

  const [request, setRequest] = React.useState('');
  const [response, setResponse] = React.useState('');

  const handleApply = useCallback(() => {
    setWidth(+tempWidth);
    setHeight(+tempHeight);
    setId(tempId);
    setRequest('');
    setResponse('');
  }, [tempWidth, tempHeight, tempId]);

  return (
    <ScrollView
      style={[styles.container]}
      contentInsetAdjustmentBehavior='automatic'
    >
      <View style={styles.controls}>
        <Text style={styles.output}>
          Display size {Math.round(window.width * PixelRatio.get())} x{' '}
          {Math.round(window.height * PixelRatio.get())}
        </Text>
      </View>

      <View style={styles.controls}>
        <Text style={styles.label}>Width</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter width'
          value={tempWidth}
          onChangeText={setTempWidth}
          autoCapitalize='none'
          keyboardType='numeric'
        />

        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter height'
          value={tempHeight}
          onChangeText={setTempHeight}
          autoCapitalize='none'
          keyboardType='numeric'
        />

        <Text style={styles.label}>ID</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter ID'
          value={tempId}
          onChangeText={setTempId}
          autoCapitalize='none'
          keyboardType='numeric'
        />

        <Button
          title='Apply'
          onPress={handleApply}
        />
      </View>

      <View style={styles.controls}>
        <XoaltView
          width={width}
          height={height}
          prebidId={id}
          onFetched={(req, res) => {
            setRequest(req);
            setResponse(res);
          }}
        />
      </View>

      <View style={styles.controls}>
        <Text style={styles.output}>Request</Text>
        <Text style={styles.output}>{request}</Text>

        <Text style={styles.output}>Response</Text>
        <Text style={styles.output}>{response}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  controls: {
    flex: 1,
    padding: 4,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  output: {
    fontSize: 18,
    fontWeight: '500',
  },
});
