import React, { PureComponent } from 'react';
import Event from '../components/Event/Event';
import Loader from '../components/Loader/Loader';
import { getData } from '../fakeAPI/index';
import { getFormatTime, checkTime, notificationInterval } from '../helper';

class Main extends PureComponent {
    state = {
        events: [],
        message: '',
        loader: true
    }

    async componentDidMount() {
        const result = await getData('./db.json');
        const events = result?.collection[0].events;
        
        if (events) {
            notificationInterval(events);
            this.setState({
                events,
                loader: false
            });
        } else {
            this.setState({
                message: 'Ошибка HTTP',
                loader: false
            });
        }
    }

    render() {
        const {events, loader, message} = this.state;  
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Расписание мероприятий</h1>
                    {
                        events.length !== 0 ? events.map((item, index) => 
                            <Event 
                                key={`${item.id}-${item.folder}`} 
                                timeStart={getFormatTime(item.timeStart)} 
                                timeEnd={getFormatTime(item.timeEnd)} 
                                info={item.info}
                                delay={index}
                                status={checkTime(item.timeStart, item.timeEnd, item.info.title)}
                            />
                        ) : loader ? <Loader /> : <p>{message ? message : 'Нету мероприятий'}</p>
                    }
                </header>
            </div>
        )
    };
}

export default Main;