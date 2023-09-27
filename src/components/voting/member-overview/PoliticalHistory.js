import React from 'react';
import PropTypes from 'prop-types';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { Card, Col, Row } from 'react-bootstrap';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { getColor } from 'helpers/utils';
import FalconLink from 'components/common/FalconLink';
import Flex from 'components/common/Flex';
import SoftBadge from 'components/common/SoftBadge';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent
]);

const getOptions = data => ({
  color: [
    getColor('success'),
    getColor('primary'),
    getColor('info'),
    getColor('warning')
  ],
  tooltip: {
    trigger: 'item',
    padding: [7, 10],
    backgroundColor: getColor('gray-100'),
    borderColor: getColor('gray-300'),
    textStyle: { color: getColor('dark') },
    borderWidth: 1,
    transitionDuration: 0,
    formatter: params =>
      `<strong>${params.data.name}:</strong> ${params.data.value}%`
  },

  legend: { show: false },
  series: [
    {
      type: 'pie',
      radius: ['85%', '60%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderWidth: 2,
        borderColor: getColor('gray-100')
      },
      label: {
        show: true
      },
      emphasis: {
        scale: false
      },
      labelLine: { show: false },
      data
    }
  ]
});

const PoliticalHistory = ({ history }) => {
  const getData = () => {
    const dataSet = history.map(h => {
      return { value: h.noOfYears, name: h.period };
    });
    console.log('Data set ', dataSet);
    return dataSet;
  };

  return (
    <Card className="h-100 font-sans-serif">
      <FalconCardHeader
        light
        title="Political History"
        titleTag="h6"
        className="py-2"
        endEl={
          <FalconLink
            title="Individual results"
            className="px-0 fw-medium disabled"
          />
        }
      />
      <Card.Body>
        <Row className="g-0 h-100">
          <Col sm={8} className="order-1 order-sm-0">
            <Row className="g-sm-0 gy-4 row-cols-2 h-100 align-content-between">
              {history.map(item => (
                <Col key={item.id}>
                  <Flex className="mb-3 gap-2">
                    {/*TODO: to have the party color*/}
                    <div className={`vr rounded ps-1 bg-${item.color}`} />
                    <h6 className="lh-base text-700 mb-0">
                      {item.period}
                      {item.id === 0 && (
                        <SoftBadge
                          bg={item.badge.type}
                          pill
                          className="d-none d-md-inline-block ms-2"
                        >
                          - present
                        </SoftBadge>
                      )}
                    </h6>
                  </Flex>
                  <h5 className="fw-normal">{item.title}</h5>
                </Col>
              ))}
            </Row>
          </Col>
          <Col sm={4}>
            <ReactEChartsCore
              echarts={echarts}
              option={getOptions(getData())}
              style={{ height: 160 }}
            />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

PoliticalHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PoliticalHistory;
