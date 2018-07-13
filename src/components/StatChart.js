import React,{Component} from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

export default class StatChart extends Component{
  static propTypes = {
    typecolor: PropTypes.string.isRequired,
    statsData: PropTypes.array.isRequired
  }

  componentDidMount(){
    var statDataSet = [];
    this.props.statsData.forEach((stat)=>{
      statDataSet.push(stat.base_stat); 
    });

    const mainColor = this.props.typecolor;
    const hoverColor = 'white';

    const ctx = document.getElementById("StatChart");
    Chart.defaults.global.legend.display = false;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["HP", "ATK", "DEF", "SAK", "SDF", "SPD"],
        datasets: [{
          data: statDataSet,
          backgroundColor: [
            mainColor,
            mainColor,
            mainColor,
            mainColor,
            mainColor,
            mainColor
          ],
          borderColor: [
            hoverColor,
            hoverColor,
            hoverColor,
            hoverColor,
            hoverColor,
            hoverColor
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero:true,
              maxTicksLimit:5,
              max:200,
              min: 0
            }
          }]
        }
      }
    });
  }
  render(){
    const style = { borderColor: this.props.typecolor };
    return(
      <div style={style} className="Chart__container">
      <canvas className="Chart__chart" id="StatChart" width="400" height="400"></canvas>
      </div>
    );
  }
}


