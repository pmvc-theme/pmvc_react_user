import React from 'react';
import {mixClass,  reactStyle, Message, SemanticUI} from 'react-atomic-molecule';
import get from 'get-object-value';

export class CardTitle extends React.Component
{
    render()
    {
        return (
            <SemanticUI atom="h1" styles={[Styles.cardTitle]} ui={false}>{this.props.children}</SemanticUI>
        )
    }
}

export class CardField extends React.Component
{
   static defaultProps = {
        type: "text",
        required: "required"
   };

   constructor(props)
   {
      super(props);
      let css = [Styles.cardInputLabel];
      if (props.value) {
          css = [Styles.cardInputLabel ,Styles.cardInputFocus];
      }
      this.state = {
        css: css,
        barFocus: [],
        value: get(props, ['value'], '')
      };
    } 

    render()
    {
        const {id, label, messageType, message, refCb, ...props} = this.props;
        let messageEl;
        if (message) {
           messageEl = <Message messageType={messageType}>{message}</Message>;
        }
        return (
            <SemanticUI style={Styles.cardFieldContainer} className="field" ui={false}>
                <SemanticUI className="inner" style={Styles.cardFieldInner}>
                    <SemanticUI {...props}
                            atom="input"
                            value={this.state.value}
                            refCb={el=>{this.el=el;refCb(el);}}
                            styles={Styles.cardInput} 
                            onFocus={()=>{
                                this.setState({
                                    css:[Styles.cardInputLabel, Styles.cardInputFocus],
                                    barFocus: [Styles.inputBarStartFocus]
                                });
                            }}
                            onBlur={()=>{
                                let css = [Styles.cardInputLabel];
                                let len = this.el.value.length;
                                if (len) {
                                    css = [Styles.cardInputLabel ,Styles.cardInputFocus];
                                }
                                this.setState({
                                    css:css,
                                    barFocus: []
                                });
                            }}
                            onChange={(e)=>{
                                this.setState({
                                    value: e.target.value 
                                });
                            }}
                    />
                    <SemanticUI atom="label" htmlFor={id} styles={this.state.css}>{label}</SemanticUI>
                    <SemanticUI styles={Styles.cardInputBar}>
                         <SemanticUI styles={this.state.barFocus} style={{...Styles.inputBarFocus,...Styles.inputBarLeft}} />
                         <SemanticUI styles={this.state.barFocus} style={{...Styles.inputBarFocus,...Styles.inputBarRight}} />
                    </SemanticUI>
                </SemanticUI>
                {messageEl}
            </SemanticUI>
        )
    }
}

export class CardButtons extends React.Component
{
    render()
    {
        return (
            <SemanticUI styles={[Styles.buttonContainer]} ui={false}>{this.props.children}</SemanticUI>
        )
    }
}

export class CardButton extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {
        css:[Styles.button],
        textClick:[],
        click:<SemanticUI atom="span" styles={Styles.buttonClick} /> 
      };
    } 
    render()
    {
        return (
            <SemanticUI {...this.props} styles={this.state.css} atom="button" ui={false} onMouseEnter={()=>{
                this.setState({
                    css:[Styles.button,Styles.buttonHover]
                });
             }} onMouseLeave={()=>{
                this.setState({
                    css:[Styles.button],
                    textClick: [],
                    click: <SemanticUI atom="span" styles={[Styles.buttonClick]} />
                });
            }} onMouseDown={()=>{
                this.setState({
                    textClick: [Styles.buttonTextStartClick],
                    click: <SemanticUI atom="span" styles={[Styles.buttonClick,Styles.buttonStartClick]} />
                });
            }} onMouseUp={()=>{
                this.setState({
                    textClick: [],
                    click: <SemanticUI atom="span" styles={[Styles.buttonClick]} />
                });
            }}>
                {this.state.click}
                <SemanticUI atom="span" styles={this.state.textClick}>{this.props.children}</SemanticUI>
            </SemanticUI>
        )
    }
}

export class CardFooter extends React.Component
{
    render()
    {
        return (
            <SemanticUI styles={Styles.footer} ui={false}>{this.props.children}</SemanticUI>
        )
    }
}

export class CardLink extends React.Component
{
   constructor(props)
   {
      super(props);
      this.state = {
        css:[Styles.link] 
      };
    } 
    render()
    {
        return (
            <SemanticUI {...this.props} styles={this.state.css} atom="a" ui={false} onMouseEnter={()=>{
                this.setState({
                    css:[Styles.link,Styles.linkHover]
                });
             }} onMouseLeave={()=>{
                this.setState({
                    css:[Styles.link]
                });
            }}>{this.props.children}</SemanticUI>
        )
    }
}

export class Card extends React.Component
{
    render()
    {
        var classes = mixClass(
            this.props.className
            ,'card'
        );
        return (
            <SemanticUI {...this.props} styles={[Styles.card,this.props.styles]} className={classes} ui={false}>{this.props.children}</SemanticUI>
        );
    }
}

const Styles = {
    card: reactStyle({
        position: 'relative',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        padding: '60px 0 40px 0',
        boxSizing: 'border-box',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        transition: ['.3s ease']
    }),
    cardTitle: reactStyle({
        position: 'relative',
        zIndex: 1,
        borderLeft: '5px solid #ed2553',
        margin: '0 0 35px',
        padding: '10px 0 10px 50px',
        color: '#ed2553',
        fontSize: '32px',
        fontWeight: '700',
        textTransform: 'uppercase',
    }),
    cardFieldContainer: {
        margin: '0 60px 50px'
    },
    cardFieldInner: {
        position: 'relative'
    },
    cardInput: reactStyle({
        outline: 'none',
        zIndex: 1,
        position: 'relative',
        background: 'none',
        width: '100%',
        height: '60px',
        border: 0,
        color: '#212121',
        fontSize: '24px',
        fontWeight: '400'
    }),
    cardInputFocus: reactStyle({
        color: '#9d9d9d',
        transform: ['translate(-12%, -50%) scale(0.75)']
    }),
    cardInputLabel: reactStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        color: '#757575',
        fontSize: '24px',
        fontWeight: '300',
        lineHeight: '60px',
        transition: ['0.2s ease'],        
    }),
    cardInputBar: reactStyle({
        position: 'absolute',
        left: 0,
        bottom: 0,
        backgroundColor: '#757575',
        width: '100%',
        height: '1px',
    }),
    inputBarFocus: {
        position: 'absolute',
        backgroundColor: '#ed2553',
        width: 0,
        height: '2px',
        transition: ['.2s ease']
    },
    inputBarLeft: {
        left: '50%'
    },
    inputBarRight: {
        right: '50%'
    },
    inputBarStartFocus: reactStyle({
        width: '50% !important'
    }),
    buttonContainer: reactStyle({
        margin: '0 60px',
        textAlign: 'center'
    }),
    button: reactStyle({
        outline: 0,
        cursor: 'pointer',
        position: 'relative',
        display: 'inline-block',
        background: 0,
        width: '240px',
        border: '2px solid #e3e3e3',
        color: '#ddd',
        padding: '20px 0',
        fontSize: '24px',
        fontWeight: 600,
        lineHeight: 1,
        textTransform: 'uppercase',
        overflow: 'hidden',
        transition: ['.3s ease']
    }),
    buttonHover: reactStyle({
        borderColor: '#ed2553',
        color: '#ed2553',
    }),
    buttonClick: reactStyle({
        position: 'absolute',
        top: '50%',
        left: '50%',
        background: '#ed2553',
        width: '30px',
        height: '30px',
        borderRadius: '100%',
        margin: '-15px 0 0 -15px',
        opacity: 0,
        transition: ['.3s ease']
    }),
    buttonStartClick: reactStyle({
        opacity:1,
        transform: ['scale(10)']
    }),
    buttonTextStartClick: reactStyle({
        color:'#fff',
        position:'relative'
    }),
    footer: reactStyle({
        margin: '40px 0 0',
        color: '#d3d3d3',
        fontSize: '24px',
        fontWeight: 300,
        textAlign: 'center'
    }),
    link: reactStyle({
        color: 'inherit',
        textDecoration: 'none', 
        transition: ['.3s ease']
    }),
    linkHover: reactStyle({
        color: '#b9b9b9',
    }),
};
