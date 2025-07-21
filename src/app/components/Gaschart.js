"use client";

import React, { useEffect, useRef } from "react";
import { createChart, CrosshairMode } from "lightweight-charts";
import useGasStore from "../store/useGasStore";

const GasChart = () => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);

  const mode = useGasStore((state) => state.mode);
  const selectedchain = useGasStore((state) => state.selectedchain);
  const allCandles = useGasStore((state) => state.candles);
  const candles = allCandles[selectedchain] || [];

  // Sort candles by time to fix "Assertion failed: data must be asc ordered by time"
  const sortedCandles = [...candles].sort((a, b) => a.time - b.time);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Clean up previous chart
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
      seriesRef.current = null;
    }

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 300,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
      },
    });

    chartRef.current = chart;

    const series = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    seriesRef.current = series;

    if (sortedCandles.length > 0) {
      series.setData(sortedCandles);
    }

    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.resize(chartContainerRef.current.clientWidth, 300);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
        seriesRef.current = null;
      }
    };
  }, [selectedchain]);

  useEffect(() => {
    if (seriesRef.current && sortedCandles.length > 0) {
      seriesRef.current.setData(sortedCandles);
    }
  }, [candles, selectedchain]);

  // Simulated live mode
  useEffect(() => {
    if (mode !== "live") return;

    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const newCandle = {
        time: now,
        open: Math.random() * 100 + 100,
        high: Math.random() * 10 + 150,
        low: Math.random() * 10 + 90,
        close: Math.random() * 100 + 100,
      };
      useGasStore.getState().addCandle(selectedchain, newCandle);
    }, 5000);

    return () => clearInterval(interval);
  }, [mode, selectedchain]);

  return <div ref={chartContainerRef} className="w-full h-[300px]" />;
};

export default GasChart;
