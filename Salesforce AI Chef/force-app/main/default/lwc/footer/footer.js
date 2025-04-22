import { LightningElement, api } from 'lwc';
import PortfolioAssets from '@salesforce/resourceUrl/PortfolioAssets';

export default class Footer extends LightningElement {

    @api linkedinUrl 
    @api githubUrl 
    @api trailheadUrl 
    @api blogUrl 

    year = new Date().getFullYear();


    linkedin = `${PortfolioAssets}/PortfolioAssets/Social/linkedin.svg`
    github = `${PortfolioAssets}/PortfolioAssets/Social/github.svg`
    youtube = `${PortfolioAssets}/PortfolioAssets/Social/youtube.svg`
    trailhead1 = `${PortfolioAssets}/PortfolioAssets/Social/trailhead1.svg`
    blog = `${PortfolioAssets}/PortfolioAssets/Social/blog.svg`
}