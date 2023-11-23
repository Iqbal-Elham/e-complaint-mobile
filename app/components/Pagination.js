import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Pagination({
  hasNext,
  hasPrev,
  totalPages,
  currentPage,
  setCurrentPage,
}) {
  const { t } = useTranslation();
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: hasPrev ? '#007bff' : '#007bff55',
        }}
        onPress={() => paginate(currentPage - 1)}
        disabled={!hasPrev}
      >
        <Text style={styles.buttonText}>{t('previous')}</Text>
      </TouchableOpacity>

      <Text style={styles.pageNumberText}>
        {currentPage} / {totalPages}
      </Text>

      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: hasNext ? '#007bff' : '#007bff55',
        }}
        onPress={() => paginate(currentPage + 1)}
        disabled={!hasNext}
      >
        <Text style={styles.buttonText}>{t('next')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
  },
  pageNumberText: {
    fontSize: 16,
  },
});
